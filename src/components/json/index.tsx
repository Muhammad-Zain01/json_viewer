import KeyValueRender from "./components/key-value-render";

const JsonParser: React.FC<any> = ({ data, isArray, level }) => {
  return (
    <div>
      <span>{isArray ? "[" : "{"}</span>
      <div>
        {Array.isArray(data)
          ? data.map((item, idx) => {
              return (
                <KeyValueRender
                  indent={1}
                  key={idx}
                  label={idx}
                  value={item}
                  row={idx}
                  level={level}
                />
              );
            })
          : typeof data == "object" &&
            Object.keys(data).map((key, idx) => {
              const KeyValue = data[key];
              return (
                <KeyValueRender
                  indent={1}
                  key={idx}
                  label={key}
                  row={idx}
                  value={KeyValue}
                  level={level}
                />
              );
            })}
      </div>
      <span>{isArray ? "]" : "}"}</span>
    </div>
  );
};

export default JsonParser;
