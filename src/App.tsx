import JsonTextBox from "./components/json-text-box";
import JsonViewer from "./components/json-viewer";
import TabView from "./components/tab-view";
import AlertBox from "./components/alert-box";
import LoadJson from "./components/modal/load-json";
import GithubButton from "./components/json/components/github-buttom";
import MultipleTabs from "./components/multiple-tabs";
import useData from "./hooks/useData";
import { Button } from "./components/ui/button";
import { Plus } from "lucide-react";
import { useApp } from "./context/app-context";
function App() {
  const { setTabModal } = useApp();
  const data = useData();

  const { currentTab } = data;
  return (
    <div className="tw-container">
      <div className="tw-flex tw-mb-4 tw-border-b tw-justify-between tw-items-center">
        <h1 className="tw-text-xl tw-font-bold tw-py-5 tw-px-3">
          JSON Viewer / Editor
        </h1>
        <div>
          <GithubButton />
        </div>
      </div>
      <MultipleTabs />
      {currentTab ? (
        <div className="tw-container tw-p-2 tw-border tw-rounded">
          <TabView />
          {currentTab == "viewer" && <JsonViewer />}
          {currentTab == "text" && <JsonTextBox />}
          <AlertBox />
          <LoadJson />
        </div>
      ) : (
        <div className="tw-flex tw-h-[600px] tw-justify-center tw-items-center ">
          <Button onClick={() => setTabModal(true)}>
            <Plus size={18} className="tw-mr-2" />
            New Tab
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
