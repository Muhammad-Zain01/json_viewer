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
      className={`tw-flex tw-mr-1 tw-justify-between tw-items-center tw-w-fit tw-py-1 tw-pl-3 tw-border tw-rounded tw-cursor-pointer ${
        isSelected ? "tw-border-gray-400" : ""
      }`}
      onClick={onClick}
    >
      <span className="tw-w-[140px] tw-overflow-hidden tw-whitespace-nowrap tw-text-ellipsis">
        {name}
      </span>
      <span
        className="tw-ml-2 tw-mr-2  hover:tw-bg-gray-100 tw-p-[5px] tw-rounded"
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
          className="tw-flex tw-items-center tw-py-3 tw-text-sm "
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
          <div className="tw-ml-2 tw-flex">
            <span
              className="tw-p-2 tw-rounded tw-border hover:tw-bg-gray-100"
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
