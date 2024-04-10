import { Code, Copy, ListTree, Replace } from "lucide-react";
import { useApp } from "../context/app-context";
import JsonParser from "./json";
import useData from "../hooks/useData";
import RemoveModal from "./modal/remove";
import { getValueType } from "@/lib/utils";
import CopyCodeModal from "./modal/copy-code";
import Tooltip from "./tooltip";

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
  const { ResetOpenKey, setActionModal, actionModal, setJsonText } = useApp();
  const data = useData();
  if (data) {
    const { openKeys, jsonObject } = data;
    const jsonObjectType = getValueType(jsonObject);
    const handleToggleTree = () => {
      if (openKeys.length) {
        ResetOpenKey();
      }
    };
    const handleCode = () => {
      setActionModal({ ...actionModal, type: "copy", show: true });
    };
    const handleReplace = () => {
      setJsonText(JSON.stringify(jsonObject, null, 4));
    };

    if (jsonObject) {
      return (
        <>
          <div className="mt-5 m-2">
            <div className="flex border rounded items-center p-2 mb-2">
              <Tooltip text="Close All">
                <ToolbarIcon
                  icon={<ListTree size={16} />}
                  onClick={() => handleToggleTree()}
                />
              </Tooltip>

              <Tooltip text="Copy JSON Object">
                <ToolbarIcon
                  icon={<Copy size={16} />}
                  onClick={() => handleCode()}
                />
              </Tooltip>
              <Tooltip text="Replace with Entered JSON">
                <ToolbarIcon
                  icon={<Replace size={16} />}
                  onClick={() => handleReplace()}
                />
              </Tooltip>
            </div>

            <div className="border rounded p-2 overflow-scroll">
              <JsonParser
                data={jsonObject}
                isArray={jsonObjectType == "array" ? true : false}
                level={0}
                parentId={0}
              />
            </div>
          </div>
          <RemoveModal />
          <CopyCodeModal />
        </>
      );
    }
  }
};

export default JsonViewer;
