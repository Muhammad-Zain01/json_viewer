import { ListTree } from "lucide-react";
import { useApp } from "../context/app-context";
import JsonParser from "./json";
import useData from "../hooks/useData";
import RemoveModal from "./modal/remove";
import EditModal from "./modal/edit";

const ToolbarIcon: React.FC<{ icon: React.ReactNode; onClick: () => void }> = ({
  icon,
  onClick,
}) => {
  return (
    <div className="flex justify-between items-center">
      <span
        className="inline-block rounded border p-2 mx-1 hover:bg-gray-50"
        onClick={onClick}
      >
        {icon}
      </span>
    </div>
  );
};
const JsonViewer = () => {
  const { ResetOpenKey } = useApp();
  const data = useData();
  if (data) {
    const { openKeys, jsonObject } = data;

    const handleToggleTree = () => {
      if (openKeys.length) {
        ResetOpenKey();
      }
    };

    if (jsonObject) {
      return (
        <>
          <div className="mt-5 m-2">
            <div className="flex border rounded items-center p-2 mb-2">
              <ToolbarIcon
                icon={<ListTree size={16} />}
                onClick={() => handleToggleTree()}
              />
              <ToolbarIcon
                icon={<ListTree size={16} />}
                onClick={() => handleToggleTree()}
              />
            </div>

            <div className="border rounded p-2 overflow-scroll">
              <JsonParser
                data={jsonObject}
                isArray={Array.isArray(jsonObject)}
                level={0}
                parentId={0}
              />
            </div>
          </div>
          <RemoveModal />
          <EditModal />
        </>
      );
    }
  }
};

export default JsonViewer;
