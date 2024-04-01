import JsonTextBox from "./components/json-text-box";
import JsonViewer from "./components/json-viewer";
import TabView from "./components/tab-view";
import { useApp } from "./context/app-context";
import AlertBox from "./components/alert-box";
import LoadJson from "./components/modal/load-json";
function App() {
  const { currentTab } = useApp();
  return (
    <div className="tw-m-10 tw-p-2 tw-border tw-rounded">
      <TabView />
      {currentTab == "viewer" && <JsonViewer />}
      {currentTab == "text" && <JsonTextBox />}
      <AlertBox />
      <LoadJson />
    </div>
  );
}

export default App;
