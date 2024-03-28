import { useApp } from "../context/app-context";

const JsonViewer = () => {
  const { jsonData } = useApp();
  return (
    <div className="tw-mt-5 tw-m-2">
      <div>{jsonData}</div>
    </div>
  );
};

export default JsonViewer;
