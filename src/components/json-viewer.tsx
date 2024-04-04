import { ListTree } from "lucide-react";
import { useApp } from "../context/app-context";
import JsonParser from "./json";
import useData from "../hooks/useData";
import RemoveModal from "./modal/remove";
import EditModal from "./modal/edit";

const ToolbarIcon: React.FC<{ icon: React.ReactNode; onClick: () => {} }> = ({
  icon,
  onClick,
}) => {
  return (
    <div className="tw-flex tw-justify-between tw-items-center">
      <span
        className="tw-inline-block tw-rounded tw-border tw-p-2 tw-mx-1 hover:tw-bg-gray-50"
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
          <div className="tw-mt-5 tw-m-2">
            <div className="tw-flex tw-border tw-rounded tw-items-center tw-p-2 tw-mb-2">
              <ToolbarIcon
                icon={<ListTree size={16} />}
                onClick={() => handleToggleTree}
              />
              <ToolbarIcon
                icon={<ListTree size={16} />}
                onClick={() => handleToggleTree}
              />
            </div>

            <div className="tw-border tw-rounded tw-p-2 tw-overflow-scroll">
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
