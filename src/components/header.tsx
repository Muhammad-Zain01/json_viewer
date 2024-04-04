import GithubButton from "./json/components/github-buttom";

const Header = () => {
  return (
    <div className="tw-flex tw-mb-4 tw-border-b tw-justify-between tw-items-center">
      <h1 className="tw-text-xl tw-font-bold tw-py-5 tw-px-3">
        JSON Viewer / Editor
      </h1>
      <div>
        <GithubButton />
      </div>
    </div>
  );
};

export default Header;
