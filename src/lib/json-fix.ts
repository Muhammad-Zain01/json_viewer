// @ts-nocheck
class JSONParser {
  static STRING_DELIMITERS = ['"', "'", '"', '"'];
  jsonStr: any;
  index: number;
  context: JsonContext;
  logging: boolean;
  logger: any[];
  log: (text: string) => void;
  streamStable: boolean;

  constructor(
    jsonStr: string,
    jsonFd = null,
    logging = false,
    jsonFdChunkLength = 0,
    streamStable = false
  ) {
    this.jsonStr = jsonStr;
    if (jsonFd) {
      this.jsonStr = new StringFileWrapper(jsonFd, jsonFdChunkLength);
    }
    this.index = 0;
    this.context = new JsonContext();
    this.logging = logging;

    if (logging) {
      this.logger = [];
      this.log = this._log.bind(this);
    } else {
      this.log = () => {};
    }

    this.streamStable = streamStable;
  }

  parse() {
    let json = this.parseJson();
    if (this.index < this.jsonStr.length) {
      this.log(
        "The parser returned early, checking if there's more json elements"
      );
      json = [json];
      let lastIndex = this.index;

      while (this.index < this.jsonStr.length) {
        const j = this.parseJson();
        console.log(
          this.index,
          this.jsonStr.length,
          this.index < this.jsonStr.length
        );
        if (j !== "") {
          if (ObjectComparer.isSameObject(json[json.length - 1], j)) {
            json.pop();
          }
          json.push(j);
        }

        if (this.index === lastIndex) {
          this.index += 1;
        }
        lastIndex = this.index;
      }

      if (json.length === 1) {
        this.log(
          "There were no more elements, returning the element without the array"
        );
        json = json[0];
      }
    }

    if (this.logging) {
      return [json, this.logger];
    } else {
      return json;
    }
  }

  parseJson() {
    while (true) {
      const char = this.getCharAt();

      if (char === false) {
        return "";
      } else if (char === "{") {
        this.index += 1;
        return this.parseObject();
      } else if (char === "[") {
        this.index += 1;
        return this.parseArray();
      } else if (
        this.context.current === ContextValues.OBJECT_VALUE &&
        char === "}"
      ) {
        this.log(
          "At the end of an object we found a key with missing value, skipping"
        );
        return "";
      } else if (
        !this.context.empty &&
        (JSONParser.STRING_DELIMITERS.includes(char) || /[a-zA-Z]/.test(char))
      ) {
        return this.parseString();
      } else if (
        !this.context.empty &&
        (/\d/.test(char) || char === "-" || char === ".")
      ) {
        return this.parseNumber();
      } else if (char === "#" || char === "/") {
        return this.parseComment();
      } else if (char == undefined) {
        return "";
      } else {
        this.index += 1;
      }
    }
  }

  parseObject() {
    const obj = {};

    while ((this.getCharAt() || "}") !== "}") {
      this.skipWhitespacesAt();

      if ((this.getCharAt() || "") === ":") {
        this.log("While parsing an object we found a : before a key, ignoring");
        this.index += 1;
      }

      this.context.set(ContextValues.OBJECT_KEY);
      let rollbackIndex = this.index;

      let key = "";
      while (this.getCharAt()) {
        rollbackIndex = this.index;

        if (this.getCharAt() === "[" && key === "") {
          const prevKey = Object.keys(obj).pop();
          if (prevKey && Array.isArray(obj[prevKey])) {
            this.index += 1;
            const newArray = this.parseArray();
            if (Array.isArray(newArray)) {
              const prevValue = obj[prevKey];
              if (Array.isArray(prevValue)) {
                prevValue.push(
                  ...(newArray.length === 1 && Array.isArray(newArray[0])
                    ? newArray[0]
                    : newArray)
                );
              }
              this.skipWhitespacesAt();
              if (this.getCharAt() === ",") {
                this.index += 1;
              }
              this.skipWhitespacesAt();
              continue;
            } else {
              this.index = rollbackIndex;
            }
          }
        }

        key = String(this.parseString());
        if (key === "") {
          this.skipWhitespacesAt();
        }
        if (
          key !== "" ||
          (key === "" && [":", "}"].includes(this.getCharAt()))
        ) {
          break;
        }
      }

      if (this.context.context.includes(ContextValues.ARRAY) && key in obj) {
        this.log(
          "While parsing an object we found a duplicate key, closing the object here and rolling back the index"
        );
        this.index = rollbackIndex - 1;
        this.jsonStr =
          this.jsonStr.slice(0, this.index + 1) +
          "{" +
          this.jsonStr.slice(this.index + 1);
        break;
      }

      this.skipWhitespacesAt();

      if ((this.getCharAt() || "}") === "}") {
        continue;
      }

      this.skipWhitespacesAt();

      if ((this.getCharAt() || "") !== ":") {
        this.log("While parsing an object we missed a : after a key");
      }

      this.index += 1;
      this.context.reset();
      this.context.set(ContextValues.OBJECT_VALUE);

      const value = this.parseJson();
      this.context.reset();
      obj[key] = value;

      if ([",", "'", '"'].includes(this.getCharAt() || "")) {
        this.index += 1;
      }

      this.skipWhitespacesAt();
    }

    this.index += 1;
    return obj;
  }

  parseArray() {
    const arr = [];
    this.context.set(ContextValues.ARRAY);

    let char = this.getCharAt();
    while (char && !["]", "}"].includes(char)) {
      this.skipWhitespacesAt();
      const value = this.parseJson();

      if (value === "") {
        this.index += 1;
      } else if (value === "..." && this.getCharAt(-1) === ".") {
        this.log("While parsing an array, found a stray '...'; ignoring it");
      } else {
        arr.push(value);
      }

      char = this.getCharAt();
      while (char && char !== "]" && (/\s/.test(char) || char === ",")) {
        this.index += 1;
        char = this.getCharAt();
      }
    }

    if (char && char !== "]") {
      this.log("While parsing an array we missed the closing ], ignoring it");
    }

    this.index += 1;
    this.context.reset();
    return arr;
  }

  parseString() {
    let missingQuotes = false;
    let doubledQuotes = false;
    let lstringDelimiter = '"';
    let rstringDelimiter = '"';

    let char = this.getCharAt();
    if (["#", "/"].includes(char)) {
      return this.parseComment();
    }

    while (
      char &&
      !JSONParser.STRING_DELIMITERS.includes(char) &&
      !/[a-zA-Z0-9]/.test(char)
    ) {
      this.index += 1;
      char = this.getCharAt();
    }

    if (!char) {
      return "";
    }

    if (char === "'") {
      lstringDelimiter = rstringDelimiter = "'";
    } else if (char === '"') {
      lstringDelimiter = '"';
      rstringDelimiter = '"';
    } else if (/[a-zA-Z0-9]/.test(char)) {
      if (
        ["t", "f", "n"].includes(char.toLowerCase()) &&
        this.context.current !== ContextValues.OBJECT_KEY
      ) {
        const value = this.parseBooleanOrNull();
        if (value !== "") {
          return value;
        }
      }
      this.log("While parsing a string, we found a literal instead of a quote");
      missingQuotes = true;
    }

    if (!missingQuotes) {
      this.index += 1;
    }

    // Handle doubled quotes check (similar to Python implementation)
    if (JSONParser.STRING_DELIMITERS.includes(this.getCharAt())) {
      // ... [simplified implementation of doubled quotes logic]
    }

    let stringAcc = "";
    char = this.getCharAt();
    let unmatchedDelimiter = false;

    while (char && char !== rstringDelimiter) {
      // [Simplified implementation of the complex string parsing logic]
      // This would include all the edge cases handled in the Python version

      if (
        missingQuotes &&
        this.context.current === ContextValues.OBJECT_KEY &&
        (char === ":" || /\s/.test(char))
      ) {
        this.log(
          "While parsing a string missing the left delimiter in object key context, we found a :, stopping here"
        );
        break;
      }

      if (
        (missingQuotes || !this.streamStable) &&
        this.context.current === ContextValues.OBJECT_VALUE &&
        [",", "}"].includes(char)
      ) {
        // [Complex logic for determining if string should end here]
        let rstringDelimiterMissing = true;
        // ... [implementation]
        if (rstringDelimiterMissing) {
          this.log(
            "While parsing a string missing the left delimiter in object value context, we found a , or } and we couldn't determine that a right delimiter was present. Stopping here"
          );
          break;
        }
      }

      stringAcc += char;
      this.index += 1;
      char = this.getCharAt();

      if (this.streamStable && !char && stringAcc.slice(-1) === "\\") {
        stringAcc = stringAcc.slice(0, -1);
      }

      if (char && stringAcc.slice(-1) === "\\") {
        this.log("Found a stray escape sequence, normalizing it");
        const escapeSeqs = { t: "\t", n: "\n", r: "\r", b: "\b", "\\": "\\" };
        stringAcc = stringAcc.slice(0, -1) + (escapeSeqs[char] || char);
        this.index += 1;
        char = this.getCharAt();
      }

      // ... [More complex string parsing logic]
    }

    if (char !== rstringDelimiter) {
      if (!this.streamStable) {
        this.log(
          "While parsing a string, we missed the closing quote, ignoring"
        );
        stringAcc = stringAcc.trimEnd();
      }
    } else {
      this.index += 1;
    }

    if (
      !this.streamStable &&
      (missingQuotes || (stringAcc && stringAcc.slice(-1) === "\n"))
    ) {
      stringAcc = stringAcc.trimEnd();
    }

    return stringAcc;
  }

  parseNumber() {
    let numberStr = "";
    let char = this.getCharAt();
    const isArray = this.context.current === ContextValues.ARRAY;
    const NUMBER_CHARS = "0123456789-.eE/,";

    while (char && NUMBER_CHARS.includes(char) && (!isArray || char !== ",")) {
      numberStr += char;
      this.index += 1;
      char = this.getCharAt();
    }

    if (numberStr && "-eE/,".includes(numberStr.slice(-1))) {
      numberStr = numberStr.slice(0, -1);
      this.index -= 1;
    } else if (/[a-zA-Z]/.test(this.getCharAt() || "")) {
      this.index -= numberStr.length;
      return this.parseString();
    }

    try {
      if (numberStr.includes(",")) {
        return numberStr;
      }
      if (
        numberStr.includes(".") ||
        numberStr.includes("e") ||
        numberStr.includes("E")
      ) {
        return parseFloat(numberStr);
      } else if (numberStr === "-") {
        return this.parseJson();
      } else {
        return parseInt(numberStr);
      }
    } catch (e) {
      return numberStr;
    }
  }

  parseBooleanOrNull() {
    const startingIndex = this.index;
    let char = (this.getCharAt() || "").toLowerCase();
    let value;

    if (char === "t") {
      value = ["true", true];
    } else if (char === "f") {
      value = ["false", false];
    } else if (char === "n") {
      value = ["null", null];
    }

    if (value) {
      let i = 0;
      while (char && i < value[0].length && char === value[0][i]) {
        i += 1;
        this.index += 1;
        char = (this.getCharAt() || "").toLowerCase();
      }
      if (i === value[0].length) {
        return value[1];
      }
    }

    this.index = startingIndex;
    return "";
  }

  parseComment() {
    const char = this.getCharAt();
    const terminationCharacters = ["\n", "\r"];

    if (this.context.context.includes(ContextValues.ARRAY)) {
      terminationCharacters.push("]");
    }
    if (this.context.context.includes(ContextValues.OBJECT_VALUE)) {
      terminationCharacters.push("}");
    }
    if (this.context.context.includes(ContextValues.OBJECT_KEY)) {
      terminationCharacters.push(":");
    }

    if (char === "#") {
      let comment = "";
      let nextChar = char;
      while (nextChar && !terminationCharacters.includes(nextChar)) {
        comment += nextChar;
        this.index += 1;
        nextChar = this.getCharAt();
      }
      this.log(`Found line comment: ${comment}`);
      return "";
    } else if (char === "/") {
      const nextChar = this.getCharAt(1);
      if (nextChar === "/") {
        let comment = "//";
        this.index += 2;
        let currentChar = this.getCharAt();
        while (currentChar && !terminationCharacters.includes(currentChar)) {
          comment += currentChar;
          this.index += 1;
          currentChar = this.getCharAt();
        }
        this.log(`Found line comment: ${comment}`);
        return "";
      } else if (nextChar === "*") {
        let comment = "/*";
        this.index += 2;
        while (true) {
          const currentChar = this.getCharAt();
          if (!currentChar) {
            this.log(
              "Reached end-of-string while parsing block comment; unclosed block comment."
            );
            break;
          }
          comment += currentChar;
          this.index += 1;
          if (comment.endsWith("*/")) {
            break;
          }
        }
        this.log(`Found block comment: ${comment}`);
        return "";
      } else {
        this.index += 1;
        return "";
      }
    } else {
      this.index += 1;
      return "";
    }
  }

  getCharAt(count = 0) {
    try {
      return this.jsonStr[this.index + count];
    } catch (e) {
      return false;
    }
  }

  skipWhitespacesAt(idx = 0, moveMainIndex = true) {
    let char;
    try {
      char = this.jsonStr[this.index + idx];
    } catch (e) {
      return idx;
    }

    while (/\s/.test(char)) {
      if (moveMainIndex) {
        this.index += 1;
      } else {
        idx += 1;
      }
      try {
        char = this.jsonStr[this.index + idx];
      } catch (e) {
        return idx;
      }
    }
    return idx;
  }

  skipToCharacter(character, idx = 0) {
    let char;
    try {
      char = this.jsonStr[this.index + idx];
    } catch (e) {
      return idx;
    }

    while (char !== character) {
      idx += 1;
      try {
        char = this.jsonStr[this.index + idx];
      } catch (e) {
        return idx;
      }
    }

    if (this.index + idx > 0 && this.jsonStr[this.index + idx - 1] === "\\") {
      return this.skipToCharacter(character, idx + 1);
    }
    return idx;
  }

  _log(text) {
    const window = 10;
    const start = Math.max(this.index - window, 0);
    const end = Math.min(this.index + window, this.jsonStr.length);
    const context = this.jsonStr.slice(start, end);
    this.logger.push({
      text: text,
      context: context,
    });
  }
}

// Supporting classes and utilities that would need to be implemented:

class ContextValues {
  static EMPTY = "EMPTY";
  static OBJECT_KEY = "OBJECT_KEY";
  static OBJECT_VALUE = "OBJECT_VALUE";
  static ARRAY = "ARRAY";
}

class JsonContext {
  constructor() {
    this.context = [];
    this.current = ContextValues.EMPTY;
  }

  set(value) {
    this.context.push(value);
    this.current = value;
  }

  reset() {
    this.context.pop();
    this.current = this.context[this.context.length - 1] || ContextValues.EMPTY;
  }

  get empty() {
    return this.context.length === 0;
  }
}

class ObjectComparer {
  static isSameObject(obj1, obj2) {
    // Simplified comparison - in production you'd want a deep comparison
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
}

class StringFileWrapper {
  constructor(fd, chunkLength) {
    this.fd = fd;
    this.chunkLength = chunkLength;
    this.content = "";
    // Implementation would handle file reading in chunks
  }
}
export default JSONParser;
