"use client";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

import useData from "@/hooks/useData";
import {
  formatPython,
  formatToGo,
  formatToJava,
  formatToJavaScript,
  formatToPHP,
  formatToRuby,
  formatToRust,
} from "@/lib/utils";
import { Copy } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";

type Lang =
  | "json"
  | "javascript"
  | "python"
  | "php"
  | "java"
  | "rust"
  | "ruby"
  | "go";

type Langs = { key: Lang; label: string };

const Languages: Langs[] = [
  { key: "javascript", label: "Javascript" },
  { key: "python", label: "Python" },
  { key: "php", label: "PHP" },
  { key: "java", label: "Java" },
  { key: "rust", label: "Rust" },
  { key: "ruby", label: "Ruby" },
  { key: "go", label: "Go" },
];

const CopyCodeModal = () => {
  // @ts-ignore
  const { jsonObject } = useData();
  const [currentLang, setCurrentLang] = useState<Lang>("json");
  const { actionModal, setActionModal } = useStore('app');

  const { type, id, show } = actionModal;
  const { toast } = useToast();
  const isShow = type == "copy" && show == true ? true : false;

  const parseObject = () => {
    switch (currentLang) {
      case "javascript":
        return formatToJavaScript(jsonObject);
      case "python":
        return formatPython(jsonObject);
      case "php":
        return formatToPHP(jsonObject);
      case "java":
        return formatToJava(jsonObject);
      case "rust":
        return formatToRust(jsonObject);
      case "ruby":
        return formatToRuby(jsonObject);
      case "go":
        return formatToGo(jsonObject);
      default:
        return JSON.stringify(jsonObject, null, 2);
    }
  };

  const onClickCopy = () => {
    const data = parseObject();
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
        <div>
          <Select
            defaultValue={currentLang}
            onValueChange={(v: Lang) => setCurrentLang(v)}
          >
            <SelectTrigger className="w-full mt-2 ">
              <SelectValue placeholder="Select a Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="json">JSON</SelectItem>
                <SelectLabel>Languages</SelectLabel>
                {Languages.map((item, idx) => (
                  <SelectItem value={item.key} key={item.key}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <main className="flex overflow-scroll h-[70vh]">
          <SyntaxHighlighter
            language={currentLang == "json" ? "javascript" : currentLang}
            style={docco}
            customStyle={{ width: "100%" }}
          >
            {parseObject()}
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

export default observer(CopyCodeModal);
