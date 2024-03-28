import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "../context/app-context";
import { isJsonValid } from "../lib/utils";

const TabView = () => {
  const { currentTab, setCurrentTab, jsonData, setAlertBox } = useApp();
  return (
    <>
      <Tabs value={currentTab}>
        <TabsList>
          <TabsTrigger
            value="viewer"
            onClick={() => {
              if (isJsonValid(jsonData)) {
                setCurrentTab("viewer");
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
};

export default TabView;
