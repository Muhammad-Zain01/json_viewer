import { useStore } from "@/store";
import useData from "../hooks/useData";
import { FormatJsonString } from "../lib/utils";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { observer } from 'mobx-react-lite'
import { Copy, Clipboard, Trash2, FileCode, Code, RefreshCw, Database } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const HeaderView = () => {
  const { setJsonText, setLoadModal } = useStore('app')

  // @ts-ignore
  const { jsonData } = useData();
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonData).then(
      function () {
        toast({
          title: "Copied to clipboard",
        });
      },
      function (err) {
        toast({
          variant: "destructive",
          title: "Your browser does not support clipboard",
          description: err.message,
        });
      }
    );
  };
  const handlePaste = () => {
    navigator.clipboard.readText().then(
      function (text) {
        setJsonText(text);
      },
      function (err) {
        toast({
          variant: "destructive",
          title: "Your browser does not support paste from clipboard",
          description: err.message,
        });
      }
    );
  };
  const handleClear = () => {
    setJsonText("");
  };

  const handleRemoveWhiteSpace = () => {
    setJsonText(jsonData.replace(/\s+/g, ""));
  };
  const handleFormatJson = () => {
    const Formated = FormatJsonString(jsonData);
    if (Formated?.success) {
      setJsonText(Formated.json);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid JSON",
        description: "Your JSON structure is invalid",
      });
    }
  };
  const handleLoadJsonData = () => {
    setLoadModal(true);
  };

  const handleLoadSampleJson = () => {
    const sampleJson = {
      "name": "JSON Viewer",
      "version": "1.0.0",
      "description": "A powerful tool for viewing and editing JSON data",
      "features": [
        "JSON formatting",
        "Syntax highlighting",
        "Tree view",
        "Search functionality",
        "Copy/paste support"
      ],
      "settings": {
        "theme": "light",
        "autoSave": true,
        "indentation": 2
      },
      "contributors": [
        {
          "name": "John Doe",
          "role": "Developer",
          "commits": 120
        },
        {
          "name": "Jane Smith",
          "role": "Designer",
          "commits": 35
        }
      ],
      "isOpenSource": true,
      "lastUpdated": "2025-04-22"
    };

    setJsonText(JSON.stringify(sampleJson, null, 2));

    toast({
      title: "Sample JSON loaded",
      description: "A sample JSON structure has been loaded for you to explore",
    });
  };

  return (
    <TooltipProvider>
      <div className="mb-2 border rounded-md p-2 bg-white shadow-sm">
        <div className="flex items-center flex-wrap gap-1">
          <div className="flex items-center gap-1 ">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={"sm"}
                  variant="outline"
                  className="text-xs font-medium flex items-center gap-1.5 h-8 hover:bg-gray-100 border-gray-300 text-gray-700"
                  onClick={handleCopy}
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white">Copy JSON</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={"sm"}
                  variant="outline"
                  className="text-xs font-medium flex items-center gap-1.5 h-8 hover:bg-gray-100 border-gray-300 text-gray-700"
                  onClick={handlePaste}
                >
                  <Clipboard className="h-3.5 w-3.5" />
                  <span>Paste</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white">Paste from clipboard</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={"sm"}
                  variant="outline"
                  className="text-xs font-medium flex items-center gap-1.5 h-8 hover:bg-gray-100 border-gray-300 text-gray-700"
                  onClick={handleClear}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white">Clear JSON</TooltipContent>
            </Tooltip>
          </div>

          <div className="h-6 border-r border-gray-200 mx-1"></div>

          <div className="flex items-center gap-1 ">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={"sm"}
                  variant="outline"
                  className="text-xs font-medium flex items-center gap-1.5 h-8 hover:bg-gray-100 border-gray-300 text-gray-700"
                  onClick={handleFormatJson}
                >
                  <Code className="h-3.5 w-3.5" />
                  <span>Format</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white">Format JSON</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={"sm"}
                  variant="outline"
                  className="text-xs font-medium flex items-center gap-1.5 h-8 hover:bg-gray-100 border-gray-300 text-gray-700"
                  onClick={handleRemoveWhiteSpace}
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Minify</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white">Remove white spaces</TooltipContent>
            </Tooltip>
          </div>

          <div className="h-6 border-r border-gray-200 mx-1"></div>

          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={"sm"}
                  variant="outline"
                  className="text-xs font-medium flex items-center gap-1.5 h-8 hover:bg-gray-100 border-gray-300 text-gray-700"
                  onClick={handleLoadJsonData}
                >
                  <FileCode className="h-3.5 w-3.5" />
                  <span>Load JSON</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white">Load JSON data</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={"sm"}
                  variant="outline"
                  className="text-xs font-medium flex items-center gap-1.5 h-8 hover:bg-gray-100 border-gray-300 text-gray-700"
                  onClick={handleLoadSampleJson}
                >
                  <Database className="h-3.5 w-3.5" />
                  <span>Sample JSON</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white">Load sample JSON data</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default observer(HeaderView);
