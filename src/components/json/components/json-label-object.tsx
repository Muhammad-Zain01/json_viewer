import { ChevronDown, ChevronRight } from "lucide-react";

type ComponentProps = {
  ValueType: string;
  hanleToggle: () => void;
  isOpen: boolean;
  label: string | number;
};
const JsonLabel: React.FC<ComponentProps> = ({
  ValueType,
  hanleToggle,
  isOpen,
  label,
}): JSX.Element => {
  return (
    <div className="flex ">
      {["object", "array"].includes(ValueType) ? (
        <span
          className="text-sm flex items-center mr-1 rounded"
          onClick={hanleToggle}
        >
          {isOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
        </span>
      ) : (
        <span className="mr-5" />
      )}
      <span className=" p-[3px] px-[6px] rounded cursor-pointer">
        {label}
      </span>
    </div>
  );
};
export default JsonLabel;
