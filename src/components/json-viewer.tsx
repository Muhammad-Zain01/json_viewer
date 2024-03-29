import { useApp } from "../context/app-context";
import { JsonParse } from "../lib/utils";
import JsonParser from "./json";

const JsonViewer = () => {
  const { jsonData } = useApp();
  const Data = JsonParse(jsonData);

  if (Data?.success) {
    return (
      <div className="tw-mt-5 tw-m-2">
        <div className="tw-border tw-rounded tw-p-2">
          <JsonParser
            data={Data?.result}
            isArray={Array.isArray(Data?.result)}
            level={0}
          />
        </div>
      </div>
    );
  }
};

export default JsonViewer;
