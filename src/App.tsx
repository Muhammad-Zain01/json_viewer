import JsonTextBox from "./components/json-text-box";
import JsonViewer from "./components/json-viewer";
import TabView from "./components/tab-view";
import AlertBox from "./components/alert-box";
import LoadJson from "./components/modal/load-json";
import MultipleTabs from "./components/multiple-tabs";
import useData from "./hooks/useData";
import { Button } from "./components/ui/button";
import { Plus } from "lucide-react";
import { useApp } from "./context/app-context";
import Header from "./components/header";

function App() {
  const { setTabModal } = useApp();
  const data = useData();

  return (
    <div className="tw-container">
      <Header />
      <MultipleTabs />
      {data && data?.currentTab ? (
        <div className="tw-container tw-p-2 tw-border tw-rounded">
          <TabView />
          {data?.currentTab == "viewer" && <JsonViewer />}
          {data?.currentTab == "text" && <JsonTextBox />}
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
