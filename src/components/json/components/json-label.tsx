type ComponentProps = {
  value: any;
};

const JsonValue: React.FC<ComponentProps> = ({ value }): JSX.Element => {
  return (
    <>
      <span className="p-[3px] rounded px-[6px] cursor-pointer">
        {value ?? 'null'}
      </span>
    </>
  );
};

export default JsonValue;
