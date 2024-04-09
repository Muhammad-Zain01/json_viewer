"use client";
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
        <div className="container">
          <Header />
          <div className="flex flex-col justify-center items-center mt-[100px] ">
            <img src="/broken.svg" alt="broken" className="w-[300px]" />
            <h2 className="text-2xl font-semibold mt-5">
              Something got broken!
            </h2>
            <div className="flex mt-5">
              <Button className="mx-1" onClick={() => window.location.reload()}>
                <RefreshCcw size={14} className="mr-2" />
                Refresh
              </Button>
              <Button
                className="mx-1"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    localStorage && localStorage.removeItem("tabs-data");
                    window.location.reload();
                  }
                }}
              >
                <RotateCw size={14} className="mr-2" />
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
