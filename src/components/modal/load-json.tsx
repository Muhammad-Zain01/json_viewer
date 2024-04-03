import { Button } from "../ui/button";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { useApp } from "../../context/app-context";
import { useToast } from "../ui/use-toast";

const LoadJson = () => {
  const [currentState, setCurreentState] = useState<string>("from-file");
  const fileRef = useRef();
  const inputRef = useRef();
  const { setJsonText, loadModal, setLoadModal } = useApp();
  const { toast } = useToast();

  const handleLoadFile = async () => {
    if (currentState == "from-file") {
      // @ts-ignore
      const file = fileRef.current?.files && fileRef.current?.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          // @ts-ignore
          const fileContent: any = event.target.result;
          if (fileContent) {
            setJsonText(fileContent);
            setLoadModal(false);
          }
        };
        reader.onerror = () => {
          toast({
            variant: "destructive",
            title: "Invalid JSON",
            description: "Your JSON structure is invalid",
          });
        };
        reader.readAsText(file);
      } else {
        toast({
          variant: "destructive",
          title: "File is Required",
        });
      }
    } else {
      // @ts-ignore
      const url = inputRef.current.value;

      if (url && url != "") {
        try {
          const data = await fetch(url);
          const result = await data.json();
          const jsonString = JSON.stringify(result);
          setJsonText(jsonString);
          setLoadModal(false);
        } catch (err) {
          toast({
            variant: "destructive",
            title: "URL is not valid or not having json data",
            // @ts-ignore
            description: err.message,
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "URL is Required",
        });
      }
    }
  };

  return (
    <Dialog open={loadModal?.show} onOpenChange={(e) => setLoadModal(e)}>
      <DialogContent className="sm:tw-max-w-md">
        <DialogHeader>
          <DialogTitle>Load JSON Data</DialogTitle>
        </DialogHeader>
        <main>
          <Tabs defaultValue="from-file">
            <TabsList className="tw-grid tw-w-full tw-grid-cols-2">
              <TabsTrigger
                value="from-file"
                onClick={() => setCurreentState("from-file")}
              >
                From File
              </TabsTrigger>
              <TabsTrigger
                value="from-url"
                onClick={() => setCurreentState("from-url")}
              >
                From URL
              </TabsTrigger>
            </TabsList>
            <TabsContent value="from-file" className="tw-mt-4">
              <Input
                // @ts-ignore
                ref={fileRef}
                type="file"
                placeholder="Choose JSON File.."
                accept="application/json"
              />
            </TabsContent>
            <TabsContent value="from-url" className="tw-mt-4">
              <Input
                // @ts-ignore
                ref={inputRef}
                placeholder="Enter URL..."
              />
            </TabsContent>
          </Tabs>
        </main>

        <DialogFooter className="sm:tw-justify-start">
          <Button type="button" onClick={handleLoadFile}>
            Load
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoadJson;
