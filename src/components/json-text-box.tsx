// @ts-nocheck
import HeaderView from "./view-header";
import useData from "../hooks/useData";
import { FileJson } from "lucide-react";
import JsonEditor from "./json/components/json-editor";
import { useStore } from "@/store";
import { observer } from 'mobx-react-lite'

const JsonTextBox = () => {
  const { setJsonText } = useStore('app')
  const data = useData();

  if (data) {
    const { jsonData } = data;
    return (
      <div className="mt-5 m-2">
        <HeaderView />
        <div className="relative">
          <div className="absolute top-3 left-3 text-gray-400">
            <FileJson size={18} />
          </div>
          <JsonEditor initialValue={jsonData} onChange={(value) => {
            setJsonText(value)
          }} />

        </div>
        <div className="text-xs text-gray-500 mt-2 text-right">
          {jsonData?.length || 0} characters
        </div>
      </div>
    );
  }
};

export default observer(JsonTextBox);
