import { useApp } from "../context/app-context";
import { Textarea } from "./ui/textarea";
import HeaderView from "./view-header";
import useData from "../hooks/useData";
const JsonTextBox = () => {
  const { setJsonText } = useApp();
  const data = useData();

  if (data) {
    const { jsonData } = data;
    return (
      <div className="mt-5 m-2">
        <HeaderView />
        <Textarea
          placeholder="Paste your JSON ..."
          rows={20}
          value={jsonData}
          onChange={(e) => setJsonText(e?.target.value)}
        />
      </div>
    );
  }
};

export default JsonTextBox;
