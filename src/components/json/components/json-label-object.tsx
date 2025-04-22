import { ChevronDown, ChevronRight } from "lucide-react";

type ComponentProps = {
  ValueType: string;
  hanleToggle: () => void;
  isOpen: boolean;
  label: string | number;
  searchTerm?: string;
};
const JsonLabel: React.FC<ComponentProps> = ({
  ValueType,
  hanleToggle,
  isOpen,
  label,
  searchTerm = "",
}): JSX.Element => {
  // Check if label matches search term for highlighting
  const isHighlighted = searchTerm && 
    String(label).toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <div className="flex">
      {["object", "array"].includes(ValueType) ? (
        <span
          className="text-sm flex items-center mr-1 rounded hover:bg-gray-100"
          onClick={hanleToggle}
        >
          {isOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
        </span>
      ) : (
        <span className="mr-5" />
      )}
      <span 
        className={`p-[3px] px-[6px] rounded cursor-pointer ${
          isHighlighted 
            ? "bg-yellow-100 text-yellow-800 font-medium" 
            : "hover:bg-gray-100"
        }`}
      >
        {label}
      </span>
    </div>
  );
};
export default JsonLabel;
