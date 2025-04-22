import { Tabs, TabsList, TabsTrigger, } from "../components/ui/tabs";
import { JsonParse, isJsonValid } from "../lib/utils";
import useData from "../hooks/useData";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import { Eye, Code, } from "lucide-react";

const TabView = () => {
  const { setCurrentTab, setAlertBox, setJsonObject } = useStore('app')

  const data = useData();
  if (data) {
    const { currentTab, jsonData } = data;

    const handleViewerClick = () => {
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
          message: "Your JSON is invalid or malformed JSON was passed into the function",
        });
      }
    };

    return (
      <div className="mb-4 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <Tabs value={currentTab} className="w-full">
          <div className="p-1">
            <TabsList className="w-full bg-transparent p-0 h-auto flex space-x-2">
              <TabsTrigger
                value="viewer"
                className="flex-1 flex items-center justify-center gap-3 py-2 px-5 rounded-t-lg border-t border-l border-r border-transparent data-[state=active]:border-gray-200 data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=inactive]:bg-gray-50 data-[state=inactive]:text-gray-500"
                onClick={handleViewerClick}
              >
                <div className="bg-gray-100 p-1.5 rounded-full flex items-center justify-center data-[state=active]:bg-gray-200 text-gray-700">
                  <Eye className="h-4 w-4" />
                </div>
                <span className="font-medium">Viewer</span>
              </TabsTrigger>
              <TabsTrigger
                value="text"
                className="flex-1 flex items-center justify-center gap-3 py-2 px-5 rounded-t-lg border-t border-l border-r border-transparent data-[state=active]:border-gray-200 data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=inactive]:bg-gray-50 data-[state=inactive]:text-gray-500"
                onClick={() => setCurrentTab("text")}
              >
                <div className="bg-gray-100 p-1.5 rounded-full flex items-center justify-center data-[state=active]:bg-gray-200 text-gray-700">
                  <Code className="h-4 w-4" />
                </div>
                <span className="font-medium">Text</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
    );
  }

  return null;
};

export default observer(TabView);
