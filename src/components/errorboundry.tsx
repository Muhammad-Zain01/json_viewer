import React from "react";
import Header from "./header";
import { Button } from "./ui/button";
import { RefreshCcw, RotateCw } from "lucide-react";

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string;
}

interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="tw-container">
          <Header />
          <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-mt-[100px] ">
            <img src="/broken.svg" alt="broken" className="tw-w-[300px]" />
            <h2 className="tw-text-2xl tw-font-semibold tw-mt-5">
              Something got broken!
            </h2>
            <div className="tw-flex tw-mt-5">
              <Button
                className="tw-mx-1"
                onClick={() => window.location.reload()}
              >
                <RefreshCcw size={14} className="tw-mr-2" />
                Refresh
              </Button>
              <Button
                className="tw-mx-1"
                onClick={() => {
                  localStorage && localStorage.removeItem("tabs-data");
                  window.location.reload();
                }}
              >
                <RotateCw size={14} className="tw-mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
