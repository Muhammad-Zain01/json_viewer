'use client'
import GithubButton from "./json/components/github-buttom";

const Header = () => {
  return (
    <div className="flex mb-4 border-b justify-between items-center">
      <h1 className="text-xl font-bold py-5 px-3">
        JSON Viewer / Editor
      </h1>
      <div>
        <GithubButton />
      </div>
    </div>
  );
};

export default Header;
