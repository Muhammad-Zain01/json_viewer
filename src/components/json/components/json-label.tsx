type ComponentProps = {
  value: any;
};

const JsonValue: React.FC<ComponentProps> = ({ value }): JSX.Element => {
  return (
    <>
      <span className="hover:tw-bg-gray-100 tw-p-[3px] tw-rounded tw-px-[6px] tw-cursor-pointer">
        {value}
      </span>
    </>
  );
};

export default JsonValue;
