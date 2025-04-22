"use client";

import JsonTextBox from "./json-text-box";
import JsonViewer from "./json-viewer";
import TabView from "./tab-view";
import AlertBox from "./alert-box";
import LoadJson from "./modal/load-json";
import useData from "@/hooks/useData";
import { Button } from "./ui/button";
import { Plus, Braces } from "lucide-react";
import { useStore } from "@/store";
import { observer } from 'mobx-react-lite'
import { useEffect } from "react";

function MainApp() {
  const { tabs, setTabModal, loading, init, saveToLocalStorage } = useStore('app')
  const data = useData();

  useEffect(() => {
    init()
  }, [])

  // Save tabs data to localStorage whenever tabs change
  useEffect(() => {
    console.log("XX")
    saveToLocalStorage()
  }, [tabs, saveToLocalStorage])

  if (loading) {
    return (
      <div className="flex justify-center text-sm items-center h-[80vh]">
        <div className="flex items-center p-3">
          <LoaderIcon className="animate-spin h-5 w-5 mr-3 text-gray-500" />
          <span className="text-gray-700">Processing...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {data && data?.currentTab ? (
        <div className="container p-3 border rounded-lg shadow-sm bg-white">
          <TabView />
          {data.currentTab === "text" ? (
            <JsonTextBox />
          ) : (
            <JsonViewer />
          )}
          <AlertBox />
          <LoadJson />
        </div>
      ) : (
        <div className="flex flex-col h-[calc(100vh-120px)] justify-center items-center">
          <div className="text-center p-8 bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm max-w-md">
            <div className="bg-gray-100 p-4 rounded-full inline-flex items-center justify-center mb-6">
              <Braces size={48} className="text-gray-700" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">No JSON Data</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Create a new tab to start viewing and editing JSON data. You can paste, import, or create new JSON content.
            </p>
            <Button
              onClick={() => setTabModal(true)}
              className="bg-gray-700 hover:bg-gray-800 transition-all px-5 py-2.5 shadow-sm"
            >
              <Plus size={18} className="mr-2" />
              <span className="font-medium">New Tab</span>
            </Button>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            JSON Viewer provides tools to visualize, edit and analyze JSON data
          </p>
        </div>
      )}
    </>
  );
}

function LoaderIcon(props: any) {
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

export default observer(MainApp);
