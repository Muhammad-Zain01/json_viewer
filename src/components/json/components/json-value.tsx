import JsonParser from "..";

type ComponentProps = {
  isOpen: boolean;
  value: any;
  level: number;
  isArray: boolean;
};

const JsonObjectValue: React.FC<ComponentProps> = ({
  isOpen,
  value,
  level,
  isArray,
}) => {
  return (
    <span className="tw-cursor-pointer">
      {isOpen ? (
        <JsonParser
          data={value}
          isArray={Array.isArray(value)}
          level={level + 1}
        />
      ) : (
        <span>{isArray ? "[...]" : "{...}"} </span>
      )}
    </span>
  );
};

export default JsonObjectValue;
