import { useApp } from "../context/app-context";
import useData from "../hooks/useData";
import { FormatJsonString } from "../lib/utils";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const HeaderView = () => {
  const Seprator = <span className="tw-border-r tw-mx-1 tw-h-[25px]"></span>;
  const { setJsonText, setLoadModal } = useApp();
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
    <div className="tw-mb-2  tw-border tw-p-1 tw-mr-1 tw-flex tw-items-center tw-flex-wrap">
      <Button
        size={"sm"}
        variant="ghost"
        className="tw-text-[12px]  tw-p-0"
        onClick={handleCopy}
      >
        Copy
      </Button>
      {Seprator}
      <Button
        size={"sm"}
        variant="ghost"
        className="tw-text-[12px]   tw-p-0"
        onClick={handlePaste}
      >
        Paste
      </Button>
      {Seprator}
      <Button
        size={"sm"}
        variant="ghost"
        className="tw-text-[12px] tw-p-0"
        onClick={handleClear}
      >
        Clear
      </Button>
      {Seprator}
      <Button
        size={"sm"}
        variant="ghost"
        className="tw-text-[12px] tw-p-0"
        onClick={handleRemoveWhiteSpace}
      >
        Remove White Spaces
      </Button>
      {Seprator}
      <Button
        size={"sm"}
        variant="ghost"
        className="tw-text-[12px] tw-p-0"
        onClick={handleFormatJson}
      >
        Format JSON
      </Button>
      {Seprator}
      <Button
        size={"sm"}
        variant="ghost"
        className="tw-text-[12px] tw-p-0"
        onClick={handleLoadJsonData}
      >
        Load JSON Data
      </Button>
    </div>
  );
};

export default HeaderView;
