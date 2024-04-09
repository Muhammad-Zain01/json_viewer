import { useApp } from "../context/app-context";
import useData from "../hooks/useData";
import { FormatJsonString } from "../lib/utils";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const HeaderView = () => {
  const Seprator = <span className="border-r mx-1 h-[25px]"></span>;
  const { setJsonText, setLoadModal } = useApp();
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
  return (
    <div className="mb-2  border p-1 mr-1 flex items-center flex-wrap">
      <Button
        size={"sm"}
        variant="ghost"
        className="text-[12px] p-2"
        onClick={handleCopy}
      >
        Copy
      </Button>
      {Seprator}
      <Button
        size={"sm"}
        variant="ghost"
        className="text-[12px] p-2"
        onClick={handlePaste}
      >
        Paste
      </Button>
      {Seprator}
      <Button
        size={"sm"}
        variant="ghost"
        className="text-[12px] p-2"
        onClick={handleClear}
      >
        Clear
      </Button>
      {Seprator}
      <Button
        size={"sm"}
        variant="ghost"
        className="text-[12px] p-2"
        onClick={handleRemoveWhiteSpace}
      >
        Remove White Spaces
      </Button>
      {Seprator}
      <Button
        size={"sm"}
        variant="ghost"
        className="text-[12px] p-2"
        onClick={handleFormatJson}
      >
        Format JSON
      </Button>
      {Seprator}
      <Button
        size={"sm"}
        variant="ghost"
        className="text-[12px] p-2"
        onClick={handleLoadJsonData}
      >
        Load JSON Data
      </Button>
    </div>
  );
};

export default HeaderView;
