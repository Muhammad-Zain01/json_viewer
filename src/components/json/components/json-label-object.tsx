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
    <div className="tw-flex ">
      {["object", "array"].includes(ValueType) ? (
        <span
          className="tw-text-sm tw-flex tw-items-center tw-mr-1 tw-rounded"
          onClick={hanleToggle}
        >
          {isOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
        </span>
      ) : (
        <span className="tw-mr-5" />
      )}
      <span className=" tw-p-[3px] tw-px-[6px] tw-rounded tw-cursor-pointer">
        {label}
      </span>
    </div>
  );
};
export default JsonLabel;
