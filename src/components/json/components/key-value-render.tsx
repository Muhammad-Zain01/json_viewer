import useData from "../../../hooks/useData";
import JsonValue from "./json-label";
import JsonLabel from "./json-label-object";
import JsonObjectValue from "./json-value";
import RowContextMenu from "../../row-context-menu";
import { getValueType } from "@/lib/utils";
import { useStore } from "@/store";
import { observer } from 'mobx-react-lite'

type ComponentProps = {
  indent: number;
  label: string | number;
  value: any;
  level: number;
  row: string;
  searchTerm?: string;
  showOnlyMatches?: boolean;
};

const KeyValueRender: React.FC<ComponentProps> = ({
  indent,
  label,
  value,
  level,
  row,
  searchTerm = "",
  showOnlyMatches = false,
}): JSX.Element => {
  const { addOpenKey, removeOpenKey, selectedRow } = useStore('app');

  const data = useData();
  const UniqueId = row;
  const isOpen =
    data && data?.openKeys.map((item) => item.id).includes(UniqueId);

  const ValueType = getValueType(value);

  const hanleToggle = () => {
    if (isOpen) {
      removeOpenKey(UniqueId);
    } else {
      addOpenKey({ id: UniqueId, label });
    }
  };
  
  const isHightlight = selectedRow == UniqueId ? true : false;
  
  // Check if this item matches the search term
  const labelMatches = searchTerm && String(label).toLowerCase().includes(searchTerm.toLowerCase());
  const valueMatches = searchTerm && 
    !["object", "array"].includes(ValueType) && 
    String(value).toLowerCase().includes(searchTerm.toLowerCase());
  
  // Apply highlight if this item matches the search
  const highlightClass = (labelMatches || valueMatches) && searchTerm 
    ? "bg-yellow-50 border-yellow-200" 
    : "";

  return (
    <RowContextMenu id={UniqueId}>
      <div
        className={`flex font-mono cursor-pointer items-start w-full mt-[1px] pl-[${indent * 10
          }px] text-[15px] transition-all duration-200 hover:bg-gray-50 ${isHightlight ? "bg-gray-100 rounded shadow-sm" : ""} ${highlightClass}`}
        style={{
          opacity: 1,
          transform: "translateY(0)",
          animation: "fadeIn 0.3s ease-in-out"
        }}
      >
        <JsonLabel
          ValueType={ValueType}
          hanleToggle={hanleToggle}
          isOpen={isOpen}
          label={label}
          searchTerm={searchTerm}
        />
        <span className="mr-2 text-gray-500">:</span>
        {!["object", "array"].includes(ValueType) ? (
          <JsonValue value={value} id={UniqueId} searchTerm={searchTerm} />
        ) : (
          <JsonObjectValue
            isOpen={isOpen}
            value={value}
            level={level}
            row={row}
            isArray={ValueType == "array" ? true : false}
            searchTerm={searchTerm}
            showOnlyMatches={showOnlyMatches}
          />
        )}
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </RowContextMenu>
  );
};

export default observer(KeyValueRender);
