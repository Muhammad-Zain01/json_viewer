import { makeAutoObservable } from 'mobx';
import { generateUUID } from '@/lib/utils';

export type CurrentTab = "text" | "viewer";
export type AlertBox = {
  show: boolean;
  title: string;
  message: string;
};
export type LoadModal = {
  show: boolean;
};
type OpenKey = {
  id: string;
  label: string | number;
};
export type Tabs = {
  id: string;
  jsonObject: any;
  name: string;
  currentTab: CurrentTab;
  jsonData: string;
  openKeys: OpenKey[];
};
export type TabModal = {
  show: boolean;
};
export type ActionModal = {
  show: boolean;
  type: "edit" | "delete" | "view" | "copy" | "";
  id: string;
};

const getData = (): Tabs[] => {
  try {
    if (typeof window !== "undefined") {
      let data = localStorage.getItem("tabs-data");
      if (data) {
        return JSON.parse(data);
      } else {
        return [];
      }
    }
    return [];
  } catch {
    return [];
  }
};

class AppStore {
  tabs: Tabs[] = [];
  alertBox: AlertBox = {
    show: false,
    title: "",
    message: "",
  };
  loadModal: LoadModal = {
    show: false,
  };
  tabModal: TabModal = {
    show: false,
  };
  actionModal: ActionModal = {
    type: "",
    id: "",
    show: false,
  };
  selectedRow: string = "";
  currentSelectedTab: string = "";
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  init = () => {
    const data = getData();
    if (data?.length) {
      this.tabs = data;
      this.currentSelectedTab = data[0].id;
    }
    this.loading = false;
  };

  saveToLocalStorage = (saveSettings: boolean = true) => {
    if (typeof window !== "undefined" && saveSettings) {
      try {
        localStorage.setItem("tabs-data", JSON.stringify(this.tabs));
      } catch (err) {
        console.error("Failed to save to localStorage:", err);
        // This would be handled by the UI toast
      }
    }
  };

  setCurrentTab = (tab: CurrentTab) => {
    const tabIndex = this.tabs.findIndex(t => t.id === this.currentSelectedTab);
    if (tabIndex !== -1) {
      this.tabs[tabIndex].currentTab = tab;
    }
  };

  setJsonText = (text: string) => {
    const tabIndex = this.tabs.findIndex(t => t.id === this.currentSelectedTab);
    if (tabIndex !== -1) {
      this.tabs[tabIndex].jsonData = text || "";
      this.tabs[tabIndex].openKeys = [];
    }
  };

  setJsonObject = (object: any) => {
    const tabIndex = this.tabs.findIndex(t => t.id === this.currentSelectedTab);
    if (tabIndex !== -1) {
      this.tabs[tabIndex].jsonObject = object;
    }
  };

  setAlertBox = (alertBox: AlertBox) => {
    this.alertBox = alertBox;
  };

  addOpenKey = (data: OpenKey) => {
    const tabIndex = this.tabs.findIndex(t => t.id === this.currentSelectedTab);
    if (tabIndex !== -1) {
      this.tabs[tabIndex].openKeys.push(data);
    }
  };

  removeOpenKey = (uniqueId: string) => {
    const tabIndex = this.tabs.findIndex(t => t.id === this.currentSelectedTab);
    if (tabIndex !== -1) {
      this.tabs[tabIndex].openKeys = this.tabs[tabIndex].openKeys.filter(
        (item) => item.id !== uniqueId
      );
    }
  };

  resetOpenKey = () => {
    const tabIndex = this.tabs.findIndex(t => t.id === this.currentSelectedTab);
    if (tabIndex !== -1) {
      this.tabs[tabIndex].openKeys = [];
    }
  };

  setLoadModal = (value: boolean) => {
    this.loadModal.show = value;
  };

  setTabModal = (value: boolean) => {
    this.tabModal.show = value;
  };

  setCurrentSelectedTab = (id: string) => {
    this.currentSelectedTab = id;
  };

  addTab = (name: string) => {
    const newTab = {
      id: generateUUID(),
      name: name,
      jsonObject: null,
      currentTab: "text" as CurrentTab,
      jsonData: "",
      openKeys: [],
    };
    this.tabs.push(newTab);
    return newTab.id;
  };

  removeTab = (id: string) => {
    this.tabs = this.tabs.filter(tab => tab.id !== id);
    if (id === this.currentSelectedTab && this.tabs.length > 0) {
      this.currentSelectedTab = this.tabs[0].id;
    } else if (this.tabs.length === 0) {
      this.currentSelectedTab = "";
    }
  };

  setSelectedRow = (value: string) => {
    this.selectedRow = value;
  };

  setActionModal = (actionModal: ActionModal) => {
    this.actionModal = actionModal;
  };

  setLoading = (value: boolean) => {
    this.loading = value;
  };

  get currentTab() {
    const tab = this.tabs.find(t => t.id === this.currentSelectedTab);
    return tab;
  }
}

export default new AppStore();
