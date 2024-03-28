import { createContext, useContext, useReducer } from "react";

const ReducerTypes = {
  setCurrentTab: "SET_CURRENT_TAB",
  setJsonText: "SET_JSON",
  setAlertBox: "SET_ALERT_BOX",
};

function CreateAction<Payload>(type: string, payload: Payload) {
  return { type, payload };
}

export type CurrentTab = "text" | "viewer";
export type AlertBox = {
  show: boolean;
  title: string;
  message: string;
};
export type ReducerState = {
  currentTab: CurrentTab;
  jsonData: string;
  alertBox: AlertBox;
};
export type AppState = ReducerState & {
  setCurrentTab: (tab: CurrentTab) => void;
  setJsonText: (text: string) => void;
  setAlertBox: (box: AlertBox) => void;
};

const initialState: ReducerState = {
  currentTab: "text",
  jsonData: "",
  alertBox: {
    show: false,
    title: "",
    message: "",
  },
};
const defaultValue: AppState = {
  ...initialState,
  setCurrentTab: (tab: CurrentTab) => {},
  setJsonText: (text: string) => {},
  setAlertBox: (box: AlertBox) => {},
};

const AppContext = createContext(defaultValue);

const AppReducer = (state: AppState, action: any) => {
  switch (action.type) {
    case ReducerTypes?.setCurrentTab:
      return {
        ...state,
        currentTab: action?.payload,
      };
    case ReducerTypes?.setJsonText:
      return {
        ...state,
        jsonData: action?.payload,
      };
    case ReducerTypes?.setAlertBox:
      return {
        ...state,
        alertBox: action?.payload,
      };
    default:
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): JSX.Element => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function Action<Payload>(type: string, payload: Payload) {
    dispatch(CreateAction<Payload>(type, payload));
  }
  const setCurrentTab = (tab: CurrentTab) =>
    Action<CurrentTab>(ReducerTypes?.setCurrentTab, tab);

  const setJsonText = (text: string) =>
    Action<string>(ReducerTypes?.setJsonText, text);

  const setAlertBox = (alertBox: AlertBox) =>
    Action<AlertBox>(ReducerTypes?.setAlertBox, alertBox);

  const value = {
    ...state,
    setCurrentTab,
    setJsonText,
    setAlertBox,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
