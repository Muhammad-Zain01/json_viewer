"use client";

import JsonTextBox from "./json-text-box";
import JsonViewer from "./json-viewer";
import TabView from "./tab-view";
import AlertBox from "./alert-box";
import LoadJson from "./modal/load-json";
import useData from "@/hooks/useData";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useApp } from "@/context/app-context";
import FormDesigner from "./form-designer";

function MainApp() {
  const { setTabModal } = useApp();
  const data = useData();

  return (
    <>
      {data && data?.currentTab ? (
        <div className="container p-2 border rounded">
          <TabView />
          {data?.currentTab == "viewer" && <JsonViewer />}
          {data?.currentTab == "text" && <JsonTextBox />}
          <AlertBox />
          <LoadJson />
        </div>
      ) : (
        <div className="flex h-[600px] justify-center items-center ">
          <Button onClick={() => setTabModal(true)}>
            <Plus size={18} className="mr-2" />
            New Tab
          </Button>
        </div>
      )}
    </>
  );
}

export default MainApp;
