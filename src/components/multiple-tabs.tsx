'use client'

import { Plus, X } from "lucide-react";
import { useApp } from "../context/app-context";
import TabModal from "./modal/tab-modal";

const Tab: React.FC<{
  isSelected?: boolean;
  name: string;
  onClick: () => void;
  onRemove: () => void;
}> = ({ isSelected = false, name, onClick, onRemove }) => {
  return (
    <div
      className={`flex mr-1 justify-between items-center w-fit py-1 pl-3 border rounded cursor-pointer ${
        isSelected ? "border-gray-400" : ""
      }`}
      onClick={onClick}
    >
      <span className="w-[140px] overflow-hidden whitespace-nowrap text-ellipsis">
        {name}
      </span>
      <span
        className="ml-2 mr-2  hover:bg-gray-100 p-[5px] rounded"
        onClick={onRemove}
      >
        <X size={11} />
      </span>
    </div>
  );
};

const MultipleTabs = () => {
  const {
    tabs,
    currentSelectedTab,
    setCurrentSelectedTab,
    removeTab,
    setTabModal,
  } = useApp();

  return (
    <>
      {tabs.length > 0 && (
        <div
          className="flex items-center py-3 text-sm "
          style={{ overflowX: "scroll" }}
        >
          {tabs.map((item, idx) => {
            return (
              <Tab
                key={idx}
                name={item?.name}
                isSelected={item.id == currentSelectedTab ? true : false}
                onClick={() => {
                  if (item.id != currentSelectedTab) {
                    setCurrentSelectedTab(item.id);
                  }
                }}
                onRemove={() => removeTab(item.id)}
              />
            );
          })}
          <div className="ml-2 flex">
            <span
              className="p-2 rounded border hover:bg-gray-100"
              onClick={() => setTabModal(true)}
            >
              <Plus size={12} />
            </span>
          </div>
        </div>
      )}

      <TabModal />
    </>
  );
};

export default MultipleTabs;
