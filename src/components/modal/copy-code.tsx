import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

import { useApp } from "../../context/app-context";
import useData from "@/hooks/useData";
import { JsonParse } from "@/lib/utils";
import { Copy } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const CopyCodeModal = () => {
  const { jsonObject } = useData();
  const { actionModal, setActionModal } = useApp();
  const { type, id, show } = actionModal;
  const { toast } = useToast();
  const isShow = type == "copy" && show == true ? true : false;

  const onClickCopy = () => {
    const data = JSON.stringify(jsonObject);
    navigator.clipboard.writeText(data).then(
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
  return (
    <Dialog
      open={isShow}
      onOpenChange={(e) => setActionModal({ id, type, show: false })}
    >
      <DialogContent className="sm:max-w-4xl ">
        <DialogHeader>
          <DialogTitle>Copy</DialogTitle>
        </DialogHeader>

        <main className="flex overflow-scroll  h-[80vh]">
          <SyntaxHighlighter language="javascript" style={docco}>
            {JSON.stringify(jsonObject, null, 2)}
          </SyntaxHighlighter>
        </main>
        <DialogFooter className="sm:justify-end">
          <Button type="button" onClick={onClickCopy}>
            <Copy size={17} className="mr-2" />
            Copy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CopyCodeModal;
