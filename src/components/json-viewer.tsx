import { Copy, ListTree, Replace, Download, Search, Filter, Eye, EyeOff, Maximize, Minimize, RefreshCw } from "lucide-react";
import JsonParser from "./json";
import useData from "../hooks/useData";
import RemoveModal from "./modal/remove";
import { getValueType } from "@/lib/utils";
import CopyCodeModal from "./modal/copy-code";
import Tooltip from "./tooltip";
import { useStore } from "@/store";
import { observer } from 'mobx-react-lite'
import { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const ToolbarIcon: React.FC<{
  icon: React.ReactNode;
  onClick: () => void;
  label: string;
  active?: boolean;
}> = ({
  icon,
  onClick,
  label,
  active = false,
}) => {
    return (
      <Tooltip text={label}>
        <button
          className={`inline-flex items-center rounded-md border p-2 mx-1 ${active 
            ? "bg-gray-100 text-gray-900 border-gray-300" 
            : "hover:bg-gray-50 text-gray-700 hover:text-gray-900 hover:border-gray-300"}`}
          onClick={onClick}
        >
          {icon}
        </button>
      </Tooltip>
    );
  };

const JsonViewer = () => {
  const { setActionModal, actionModal, resetOpenKey } = useStore('app')
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyMatches, setShowOnlyMatches] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  const data = useData();
  
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  if (data) {
    const { openKeys, jsonObject } = data;
    const jsonObjectType = getValueType(jsonObject);
    
    const handleToggleTree = () => {
      if (openKeys.length) {
        resetOpenKey();
      }
    };
    
    const handleCode = () => {
      setActionModal({ ...actionModal, type: "copy", show: true });
    };

    const handleToggleFullscreen = () => {
      setIsFullscreen(!isFullscreen);
      
      if (!isFullscreen && viewerRef.current) {
        viewerRef.current?.scrollIntoView();
      }
    };

    const handleDownload = () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonObject, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "data.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    };

    const toggleSearch = () => {
      setShowSearch(!showSearch);
      if (showSearch) {
        setSearchTerm("");
      }
    };

    const toggleShowOnlyMatches = () => {
      setShowOnlyMatches(!showOnlyMatches);
    };

    if (jsonObject) {
      return (
        <>
          <div 
            ref={viewerRef}
            className={`mt-5 m-2 ${
              isFullscreen 
                ? 'fixed top-0 left-0 right-0 bottom-0 z-50 m-0 p-4 bg-white overflow-auto' 
                : ''
            }`}
          >
            <div 
              className="flex flex-col border rounded-md bg-white overflow-hidden shadow-sm"
            >
              <div className="flex items-center p-3 border-b bg-gray-50 justify-between">
                <div className="flex flex-wrap gap-1">
                  <div className="flex items-center">
                    <ToolbarIcon
                      icon={<ListTree size={16} />}
                      onClick={handleToggleTree}
                      label="Collapse All"
                    />
                    <ToolbarIcon
                      icon={<Copy size={16} />}
                      onClick={handleCode}
                      label="Copy JSON"
                    />
                    <ToolbarIcon
                      icon={<Download size={16} />}
                      onClick={handleDownload}
                      label="Download JSON"
                    />
                  </div>
                  
                  <div className="h-6 border-r border-gray-200 mx-1"></div>
                  
                  <div className="flex items-center">
                    <ToolbarIcon
                      icon={<Search size={16} />}
                      onClick={toggleSearch}
                      label="Search in JSON"
                      active={showSearch}
                    />
                    {showSearch && (
                      <ToolbarIcon
                        icon={showOnlyMatches ? <Eye size={16} /> : <EyeOff size={16} />}
                        onClick={toggleShowOnlyMatches}
                        label={showOnlyMatches ? "Show All" : "Show Only Matches"}
                        active={showOnlyMatches}
                      />
                    )}
                  </div>
                  
                  <div className="h-6 border-r border-gray-200 mx-1"></div>
                  
                  <ToolbarIcon
                    icon={isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                    onClick={handleToggleFullscreen}
                    label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    active={isFullscreen}
                  />
                </div>
                
                <div className="text-xs text-gray-500 px-2 flex items-center gap-2">
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-medium">
                    {jsonObjectType === "array" ? "Array" : "Object"}
                  </span>
                  <span className="text-gray-500">
                    {JSON.stringify(jsonObject).length} characters
                  </span>
                </div>
              </div>
              
              {showSearch && (
                <div className="border-b bg-gray-50">
                  <div className="p-3">
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Search in JSON..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-8 text-sm"
                      />
                      {searchTerm && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSearchTerm("")}
                          className="h-8 px-2"
                        >
                          <RefreshCw size={14} />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div 
                className={`p-4 overflow-auto ${
                  isFullscreen ? 'h-[calc(100vh-180px)]' : 'max-h-[calc(100vh-380px)]'
                } bg-white`}
              >
                <JsonParser
                  data={jsonObject}
                  isArray={jsonObjectType == "array" ? true : false}
                  level={0}
                  parentId={0}
                  searchTerm={searchTerm}
                  showOnlyMatches={showOnlyMatches}
                />
              </div>
            </div>
          </div>
          <RemoveModal />
          <CopyCodeModal />
        </>
      );
    }
  }
  
  return null;
};

export default observer(JsonViewer);
