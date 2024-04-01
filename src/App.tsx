import JsonTextBox from "./components/json-text-box";
import JsonViewer from "./components/json-viewer";
import TabView from "./components/tab-view";
import { useApp } from "./context/app-context";
import AlertBox from "./components/alert-box";
import LoadJson from "./components/modal/load-json";
import GithubButton from "./components/json/components/github-buttom";
function App() {
  const { currentTab } = useApp();
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
      <div className="tw-container tw-p-2 tw-border tw-rounded">
        <TabView />
        {currentTab == "viewer" && <JsonViewer />}
        {currentTab == "text" && <JsonTextBox />}
        <AlertBox />
        <LoadJson />
      </div>
    </div>
  );
}

export default App;
