import { Button } from "./ui/button";

const HeaderView = () => {
  const Seprator = <span className="tw-border-r tw-mx-1 tw-h-[25px]"></span>;

  const handleCopy = () => {};
  const handlePaste = () => {};
  const handleClear = () => {};
  const handleRemoveWhiteSpace = () => {};
  const handleLoadJsonData = () => {};
  return (
    <div className="tw-mb-2 tw-border tw-p-1 tw-mr-1 tw-flex tw-items-center">
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
        onClick={handleLoadJsonData}
      >
        Load JSON Data
      </Button>
    </div>
  );
};

export default HeaderView;
