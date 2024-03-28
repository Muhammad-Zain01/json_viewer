import { useApp } from "../context/app-context";
import { Textarea } from "./ui/textarea";
const JsonTextBox = () => {
  const { jsonData, setJsonText } = useApp();
  return (
    <div className="tw-mt-5 tw-m-2">
      <Textarea
        placeholder="Paste your JSON ..."
        rows={20}
        value={jsonData}
        onChange={(e) => setJsonText(e?.target.value)}
      />
    </div>
  );
};

export default JsonTextBox;
