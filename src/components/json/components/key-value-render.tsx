import { useApp } from "../../../context/app-context";
import JsonValue from "./json-label";
import JsonLabel from "./json-label-object";
import JsonObjectValue from "./json-value";

type ComponentProps = {
  indent: number;
  label: string | number;
  value: any;
  level: number;
  row: number;
};

const KeyValueRender: React.FC<ComponentProps> = ({
  indent,
  label,
  value,
  level,
  row,
}): JSX.Element => {
  const { openKeys, AddOpenKey, RemoveOpenKey } = useApp();
  const UniqueId = `${row}-${level}`;
  const isOpen = openKeys.includes(UniqueId);

  let ValueType: string = typeof value;
  if (ValueType == "object") {
    if (Array.isArray(value)) {
      ValueType = "array";
    }
  }

  const hanleToggle = () => {
    if (isOpen) {
      RemoveOpenKey(UniqueId);
    } else {
      AddOpenKey(UniqueId);
    }
  };
  return (
    <div
      className={`tw-flex tw-items-start tw-mt-[1px] tw-pl-[${
        indent * 10
      }px] tw-text-[15px]`}
    >
      <JsonLabel
        ValueType={ValueType}
        hanleToggle={hanleToggle}
        isOpen={isOpen}
        label={label}
      />
      <span className="tw-mr-2">:</span>
      {!["object", "array"].includes(ValueType) ? (
        <JsonValue value={value} />
      ) : (
        <JsonObjectValue
          isOpen={isOpen}
          value={value}
          level={level}
          isArray={ValueType == "array" ? true : false}
        />
      )}
    </div>
  );
};

export default KeyValueRender;
