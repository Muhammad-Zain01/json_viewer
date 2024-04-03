import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useApp } from "../context/app-context";
import { JsonParse, isJsonValid } from "../lib/utils";
import useData from "../hooks/useData";

const TabView = () => {
  const { setCurrentTab, setAlertBox, setJsonObject } = useApp();
  const data = useData();
  if (data) {
    const { currentTab, jsonData } = data;
    return (
      <>
        <Tabs value={currentTab}>
          <TabsList>
            <TabsTrigger
              value="viewer"
              onClick={() => {
                if (isJsonValid(jsonData)) {
                  const parsed = JsonParse(jsonData);
                  if (parsed?.success) {
                    setJsonObject(parsed?.result);
                    setCurrentTab("viewer");
                  }
                } else {
                  setAlertBox({
                    show: true,
                    title: "Oops! Invalid JSON",
                    message:
                      "Your JSON is invalid or malformed JSON was passed into the function",
                  });
                }
              }}
            >
              Viewer
            </TabsTrigger>
            <TabsTrigger value="text" onClick={() => setCurrentTab("text")}>
              Text
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </>
    );
  }
};

export default TabView;
