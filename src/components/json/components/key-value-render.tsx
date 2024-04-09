import { useApp } from "../../../context/app-context";
import useData from "../../../hooks/useData";
import JsonValue from "./json-label";
import JsonLabel from "./json-label-object";
import JsonObjectValue from "./json-value";
import RowContextMenu from "../../row-context-menu";

type ComponentProps = {
  indent: number;
  label: string | number;
  value: any;
  level: number;
  row: string;
};

const KeyValueRender: React.FC<ComponentProps> = ({
  indent,
  label,
  value,
  level,
  row,
}): JSX.Element => {
  const { AddOpenKey, RemoveOpenKey, selectedRow } = useApp();

  const data = useData();
  const UniqueId = row;
  const isOpen =
    data && data?.openKeys.map((item) => item.id).includes(UniqueId);

  let ValueType: string = typeof value;
  if (!value) {
    ValueType = "null";
  }
  if (ValueType == "object") {
    if (Array.isArray(value)) {
      ValueType = "array";
    }
  }

  const hanleToggle = () => {
    if (isOpen) {
      RemoveOpenKey(UniqueId);
    } else {
      AddOpenKey({ id: UniqueId, label });
    }
  };
  const isHightlight = selectedRow == UniqueId ? true : false;

  return (
    <RowContextMenu id={UniqueId}>
      <div
        className={`flex font-mono cursor-pointer  items-start w-full mt-[1px] pl-[${
          indent * 10
        }px] text-[15px] ${isHightlight ? "bg-gray-100 rounded" : ""}`}
      >
        <JsonLabel
          ValueType={ValueType}
          hanleToggle={hanleToggle}
          isOpen={isOpen}
          label={label}
        />
        <span className="mr-2">:</span>
        {!["object", "array"].includes(ValueType) ? (
          <JsonValue value={value} />
        ) : (
          <JsonObjectValue
            isOpen={isOpen}
            value={value}
            level={level}
            row={row}
            isArray={ValueType == "array" ? true : false}
          />
        )}
      </div>
    </RowContextMenu>
  );
};

export default KeyValueRender;
