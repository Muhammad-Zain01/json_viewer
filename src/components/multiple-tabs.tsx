'use client'

import { Plus, X, FileJson } from "lucide-react";
import { observer } from 'mobx-react-lite'
import TabModal from "./modal/tab-modal";
import { useStore } from "@/store";

const Tab: React.FC<{
  isSelected?: boolean;
  name: string;
  onClick: () => void;
  onRemove: () => void;
}> = ({ isSelected = false, name, onClick, onRemove }) => {
  return (
    <div
      className={`flex  items-center h-9 px-3 cursor-pointer transition-all rounded-md ${
        isSelected
          ? "bg-white text-gray-800 shadow-sm"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <FileJson size={12} className={`mr-2 ${isSelected ? "text-gray-700" : "text-gray-400"}`} />
      <span className={`max-w-[120px] overflow-hidden text-sm whitespace-nowrap text-ellipsis ${isSelected ? "font-medium" : ""}`}>
        {name}
      </span>
      <button
        className="ml-2 p-1 rounded-full hover:bg-gray-100 opacity-60 hover:opacity-100 transition-all"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <X size={12} />
      </button>
    </div>
  );
};

const MultipleTabs = () => {
  const { tabs, currentSelectedTab, setCurrentSelectedTab, removeTab, setTabModal } = useStore('app')

  if (tabs.length === 0) {
    return <TabModal />;
  }

  return (
    <>
      <div className="mb-3">
        <div className="flex items-center border p-0.5 rounded-lg bg-gray-50">
          <div 
            className="flex-1 flex items-center gap-1 px-2 py-1 overflow-x-auto no-scrollbar "
            style={{ 
              scrollbarWidth: "none",
              msOverflowStyle: "none"
            }}
          >
            {tabs.map((item, idx) => (
              <Tab
                key={idx}
                name={item?.name}
                isSelected={item.id === currentSelectedTab}
                onClick={() => {
                  if (item.id !== currentSelectedTab) {
                    setCurrentSelectedTab(item.id);
                  }
                }}
                onRemove={() => removeTab(item.id)}
              />
            ))}
          </div>
          
          <div className="flex-shrink-0 px-2 border-l border-gray-200">
            <button
              className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setTabModal(true)}
              title="New Tab"
            >
              <Plus size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <TabModal />
    </>
  );
};

export default observer(MultipleTabs);
