import { ListTree } from "lucide-react";
import { useApp } from "../context/app-context";
import JsonParser from "./json";
import { Input } from "./ui/input";
import useData from "../hooks/useData";
import JsonBreadCrumb from "./json-breadcrumb";
import Flow from "./flow";

const JsonViewer = () => {
  const { ResetOpenKey } = useApp();
  const currentTabAdd = "flow";
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
        <div className="tw-mt-5 tw-m-2">
          <div className="tw-flex tw-border tw-rounded tw-justify-between tw-items-center tw-p-2 tw-mb-2">
            <div className="tw-w-[100%]">
              <Input placeholder="Search ..." />
            </div>
            <div className="tw-flex tw-ml-5 tw-justify-between tw-items-center">
              <span
                className="tw-inline-block tw-rounded tw-border tw-p-2 tw-mx-1 hover:tw-bg-gray-50"
                onClick={handleToggleTree}
              >
                <ListTree size={16} />
              </span>
            </div>
          </div>

          <div className="tw-border tw-rounded tw-p-2 tw-overflow-scroll">
            {currentTabAdd == "flow" ? (
              <div>
                <Flow />
              </div>
            ) : (
              <>
                <JsonBreadCrumb />
                <JsonParser
                  data={jsonObject}
                  isArray={Array.isArray(jsonObject)}
                  level={0}
                />
              </>
            )}
          </div>
        </div>
      );
    }
  }
};

export default JsonViewer;
