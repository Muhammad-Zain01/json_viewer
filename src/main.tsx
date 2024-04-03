import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AppProvider } from "./context/app-context.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import 'reactflow/dist/style.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
