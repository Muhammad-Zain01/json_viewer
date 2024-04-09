import JsonParser from "..";

type ComponentProps = {
  isOpen: boolean;
  value: any;
  level: number;
  isArray: boolean;
  row: string;
};

const JsonObjectValue: React.FC<ComponentProps> = ({
  isOpen,
  value,
  level,
  isArray,
  row
}) => {
  return (
    <div className=" cursor-pointer">
      {isOpen ? (
        <JsonParser
          data={value}
          isArray={Array.isArray(value)}
          level={level + 1}
          parentId={row}
        />
      ) : (
        <span>{isArray ? "[...]" : "{...}"} </span>
      )}
    </div>
  );
};

export default JsonObjectValue;
