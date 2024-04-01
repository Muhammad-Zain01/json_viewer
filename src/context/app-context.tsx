import { Pyramid } from "lucide-react";
import { createContext, useContext, useReducer } from "react";

const ReducerTypes = {
  setCurrentTab: "SET_CURRENT_TAB",
  setJsonText: "SET_JSON",
  setAlertBox: "SET_ALERT_BOX",
  AddOpenKeys: "ADD_OPEN_KEYS",
  RemoveOpenKeys: "REMOVE_OPEN_KEYS",
  ResetOpenKeys: "RESET_OPEN_KEYS",
  setLoadModal: "SET_LOAD_MODAL",
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
export type ReducerState = {
  currentTab: CurrentTab;
  jsonData: string;
  alertBox: AlertBox;
  openKeys: string[];
  loadModal: LoadModal;
};
export type AppState = ReducerState & {
  setCurrentTab: (tab: CurrentTab) => void;
  setJsonText: (text: string) => void;
  setAlertBox: (box: AlertBox) => void;
  AddOpenKey: (value: string) => void;
  RemoveOpenKey: (value: string) => void;
  ResetOpenKey: () => void;
  setLoadModal: (value: boolean) => void;
};

const initialState: ReducerState = {
  currentTab: "text",
  jsonData: "",
  openKeys: [],
  alertBox: {
    show: false,
    title: "",
    message: "",
  },
  loadModal: {
    show: false,
  },
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
        jsonData: action?.payload ?? "",
      };
    case ReducerTypes?.setAlertBox:
      return {
        ...state,
        alertBox: action?.payload,
      };
    case ReducerTypes?.AddOpenKeys:
      return {
        ...state,
        openKeys: [...state.openKeys, action?.payload],
      };
    case ReducerTypes?.RemoveOpenKeys:
      return {
        ...state,
        openKeys: state.openKeys.filter((item) => item != action?.payload),
      };
    case ReducerTypes?.ResetOpenKeys:
      return {
        ...state,
        openKeys: [],
      };

    case ReducerTypes?.setLoadModal:
      return {
        ...state,
        loadModal: action?.payload,
      };
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): JSX.Element => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function Action<Payload>(type: string, payload?: Payload) {
    if (payload) {
      dispatch(CreateAction<Payload>(type, payload));
    } else {
      dispatch(CreateAction<Payload>(type));
    }
  }

  const setCurrentTab = (tab: CurrentTab) =>
    Action<CurrentTab>(ReducerTypes?.setCurrentTab, tab);

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

  const value = {
    ...state,
    setCurrentTab,
    setJsonText,
    setAlertBox,
    AddOpenKey,
    RemoveOpenKey,
    ResetOpenKey,
    setLoadModal,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
