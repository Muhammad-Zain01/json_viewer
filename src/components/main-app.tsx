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

function MainApp() {
  const { setTabModal, loading } = useApp();
  const data = useData();

  if (loading) {
    return (
      <div className="flex justify-center text-sm items-center h-[70vh] ">
        <div className="flex">
          <LoaderIcon className="animate-spin h-5 w-5 mr-3" />
          Processing
        </div>
      </div>
    );
  }
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

function LoaderIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="6" />
      <line x1="12" x2="12" y1="18" y2="22" />
      <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
      <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
      <line x1="2" x2="6" y1="12" y2="12" />
      <line x1="18" x2="22" y1="12" y2="12" />
      <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
      <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
    </svg>
  );
}

export default MainApp;
