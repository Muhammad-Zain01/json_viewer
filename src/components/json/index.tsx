import { getValueType } from "@/lib/utils";
import KeyValueRender from "./components/key-value-render";

const JsonParser: React.FC<any> = ({ data, isArray, level, parentId }) => {
  const DataType = getValueType(data);
  return (
    <div>
      <span>{isArray ? "[" : "{"}</span>
      <div>
        {DataType == "array" ? (
          data.length > 0 ? (
            // @ts-ignore
            data.map((item, idx) => {
              return (
                <KeyValueRender
                  indent={1}
                  key={idx}
                  label={idx}
                  value={item}
                  row={level > 0 ? `${parentId}.${idx}` : `${idx}`}
                  level={level}
                />
              );
            })
          ) : (
            <div className="w-full py-4 text-gray-400 italic">...Empty...</div>
          )
        ) : DataType == "object" && Object.keys(data).length > 0 ? (
          Object.keys(data).map((key, idx) => {
            const KeyValue = data[key];
            return (
              <KeyValueRender
                indent={1}
                key={idx}
                label={key}
                row={level > 0 ? `${parentId}.${idx}` : `${idx}`}
                value={KeyValue}
                level={level}
              />
            );
          })
        ) : (
          <div className="w-full py-4 text-gray-400 italic">...Empty...</div>
        )}
      </div>
      <span>{isArray ? "]" : "}"}</span>
    </div>
  );
};

export default JsonParser;
