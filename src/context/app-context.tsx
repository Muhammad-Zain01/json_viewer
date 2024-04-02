import { createContext, useContext, useMemo, useReducer } from "react";
import { generateUUID } from "../lib/utils";

const ReducerTypes = {
  setCurrentTab: "SET_CURRENT_TAB",
  setJsonText: "SET_JSON",
  setAlertBox: "SET_ALERT_BOX",
  AddOpenKeys: "ADD_OPEN_KEYS",
  RemoveOpenKeys: "REMOVE_OPEN_KEYS",
  ResetOpenKeys: "RESET_OPEN_KEYS",
  setLoadModal: "SET_LOAD_MODAL",
  setCurrentSelectedTab: "SET_CURRENT_SELECTED_TAB",
  setJsonObject: "SET_JSON_OBJECT",
  addTab: "ADD_TAB",
  removeTab: "REMOVE_TAB",
  setTabModal: "SET_TAB_MODAL",
};
const getData = () => {
  try {
    let data = localStorage.getItem("tabs-data");
    if (data) {
      console.log("data", data);
      return JSON.parse(data);
    } else {
      return [];
    }
  } catch {
    return [];
  }
};
function CreateAction<Payload>(type: string, payload?: Payload) {
  if (payload) {
    return { type, payload };
  } else {
    return { type };
  }
}

export type CurrentTab = "text" | "viewer";
export type AlertBox = {
  show: boolean;
  title: string;
  message: string;
};
export type LoadModal = {
  show: boolean;
};

export type Tabs = {
  id: string;
  jsonObject: any;
  name: string;
  currentTab: CurrentTab;
  jsonData: string;
  openKeys: string[];
};
export type TabModal = {
  show: boolean;
};
export type ReducerState = {
  tabs: Tabs[];
  alertBox: AlertBox;
  loadModal: LoadModal;
  currentSelectedTab: string;
  tabModal: TabModal;
};
export type AppState = ReducerState & {
  setCurrentTab: (tab: CurrentTab) => void;
  setJsonText: (text: string) => void;
  setAlertBox: (box: AlertBox) => void;
  AddOpenKey: (value: string) => void;
  RemoveOpenKey: (value: string) => void;
  ResetOpenKey: () => void;
  setLoadModal: (value: boolean) => void;
  setCurrentSelectedTab: (id: string) => void;
  setJsonObject: (jsonObject: any) => void;
  removeTab: (id: string) => void;
  setTabModal: (value: boolean) => void;
  setAddTab: (value: string) => void;
};

const initialState: ReducerState = {
  tabs: getData(),
  alertBox: {
    show: false,
    title: "",
    message: "",
  },
  loadModal: {
    show: false,
  },
  tabModal: {
    show: false,
  },
  currentSelectedTab: "uuid-sample-here",
};

const generateNewTab = (name: string) => {
  return {
    id: generateUUID(),
    name: name,
    jsonObject: null,
    currentTab: "text",
    jsonData: "",
    openKeys: [],
  };
};
const defaultValue: AppState = {
  ...initialState,
  setCurrentTab: (tab: CurrentTab) => {},
  setJsonText: (text: string) => {},
  setAlertBox: (box: AlertBox) => {},
  AddOpenKey: (value: string) => {},
  RemoveOpenKey: (value: string) => {},
  ResetOpenKey: () => {},
  setLoadModal: (value: boolean) => {},
  setCurrentSelectedTab: (id: string) => {},
  setJsonObject: (jsonObject: any) => {},
  removeTab: (id: string) => {},
  setTabModal: (value: boolean) => {},
  setAddTab: (value: string) => {},
};

const AppContext = createContext(defaultValue);

const AppReducer = (state: AppState, action: any) => {
  switch (action.type) {
    case ReducerTypes?.setCurrentTab:
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id == state?.currentSelectedTab
            ? { ...tab, currentTab: action?.payload }
            : tab
        ),
      };

    case ReducerTypes?.setJsonText:
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id == state?.currentSelectedTab
            ? { ...tab, jsonData: action?.payload ?? "" }
            : tab
        ),
      };

    case ReducerTypes?.setAlertBox:
      return {
        ...state,
        alertBox: action?.payload,
      };
    case ReducerTypes?.AddOpenKeys:
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id == state?.currentSelectedTab
            ? { ...tab, openKeys: [...tab.openKeys, action?.payload] }
            : tab
        ),
      };

    case ReducerTypes?.setJsonObject:
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id == state?.currentSelectedTab
            ? { ...tab, jsonObject: action.payload }
            : tab
        ),
      };

    case ReducerTypes?.RemoveOpenKeys:
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id == state?.currentSelectedTab
            ? {
                ...tab,
                openKeys: tab.openKeys.filter(
                  (item) => item != action?.payload
                ),
              }
            : tab
        ),
      };

    case ReducerTypes?.ResetOpenKeys:
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id == state?.currentSelectedTab
            ? {
                ...tab,
                openKeys: [],
              }
            : tab
        ),
      };

    case ReducerTypes?.setLoadModal:
      return {
        ...state,
        loadModal: action?.payload,
      };

    case ReducerTypes?.setTabModal:
      return {
        ...state,
        tabModal: action?.payload,
      };
    case ReducerTypes?.setCurrentSelectedTab:
      return {
        ...state,
        currentSelectedTab: action?.payload,
      };
    case ReducerTypes?.removeTab:
      const updatedTab = state.tabs.filter((tab) => tab.id != action.payload);
      if (action.payload == state.currentSelectedTab) {
        return {
          ...state,
          tabs: updatedTab,
          currentSelectedTab: updatedTab.length > 0 ? updatedTab[0].id : "",
        };
      } else {
        return {
          ...state,
          tabs: updatedTab,
        };
      }

    case ReducerTypes?.addTab:
      return {
        ...state,
        tabs: [...state.tabs, generateNewTab(action?.payload)],
      };
  }
};
const updateToLocalStorage = (state: AppState) => {
  console.log(">>>", JSON.stringify(state.tabs));

  return state;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): JSX.Element => {
  const [state, dispatch] = useReducer(
    AppReducer,
    initialState,
    updateToLocalStorage
  );

  useMemo(
    () => localStorage.setItem("tabs-data", JSON.stringify(state.tabs)),
    [state]
  );

  function Action<Payload>(type: string, payload?: Payload) {
    if (payload) {
      dispatch(CreateAction<Payload>(type, payload));
    } else {
      dispatch(CreateAction<Payload>(type));
    }
  }

  const setCurrentTab = (tab: CurrentTab) =>
    Action<CurrentTab>(ReducerTypes?.setCurrentTab, tab);

  const setJsonObject = (object: any) =>
    Action<any>(ReducerTypes?.setJsonObject, object);
  const setJsonText = (text: string) =>
    Action<string>(ReducerTypes?.setJsonText, text);

  const setAlertBox = (alertBox: AlertBox) =>
    Action<AlertBox>(ReducerTypes?.setAlertBox, alertBox);

  const AddOpenKey = (UniqueId: string) =>
    Action<string>(ReducerTypes?.AddOpenKeys, UniqueId);

  const RemoveOpenKey = (UniqueId: string) =>
    Action<string>(ReducerTypes?.RemoveOpenKeys, UniqueId);

  const ResetOpenKey = () => Action(ReducerTypes?.ResetOpenKeys);

  const setLoadModal = (value: boolean) =>
    Action<LoadModal>(ReducerTypes?.setLoadModal, { show: value });

  const setTabModal = (value: boolean) =>
    Action<LoadModal>(ReducerTypes?.setTabModal, { show: value });

  const setCurrentSelectedTab = (id: string) =>
    Action<string>(ReducerTypes?.setCurrentSelectedTab, id);

  const setAddTab = (value: string) =>
    Action<string>(ReducerTypes?.addTab, value);

  const removeTab = (id: string) => Action<string>(ReducerTypes?.removeTab, id);
  const value = {
    ...state,
    setCurrentTab,
    removeTab,
    setJsonText,
    setAlertBox,
    AddOpenKey,
    RemoveOpenKey,
    ResetOpenKey,
    setLoadModal,
    setTabModal,
    setCurrentSelectedTab,
    setJsonObject,
    setAddTab,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
