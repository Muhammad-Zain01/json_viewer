import { useMemo } from "react";
import { useApp } from "../context/app-context";

const useData = () => {
  const { tabs, currentSelectedTab } = useApp();
  return useMemo(() => {
    if (tabs.length) {
      let data = tabs.find((tab) => tab.id == currentSelectedTab);
      if (!data) {
        data = tabs[0];
      }
      return data;
    }
    return false;
  }, [currentSelectedTab, tabs]);
};

export default useData;
