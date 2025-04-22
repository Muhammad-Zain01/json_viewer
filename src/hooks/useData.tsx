import { useMemo } from "react";
import { useStore } from "@/store";

const useData = () => {
  const { tabs, currentSelectedTab, setCurrentSelectedTab } = useStore('app');

  return useMemo(() => {
    if (tabs.length) {
      let data = tabs.find((tab) => tab.id == currentSelectedTab);
      if (!data) {
        setCurrentSelectedTab(tabs[0].id);
        data = tabs[0];
      }
      return data;
    }
    return false;
  }, [currentSelectedTab, tabs]);
};

export default useData;
