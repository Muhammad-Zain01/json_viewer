"use client";
import GithubButton from "./json/components/github-buttom";
import SettingModal from "./modal/settings";

const Header = () => {
  return (
    <div className="flex mb-4 border-b justify-between items-center">
      <h1 className="text-xl font-bold py-5 px-3">JSON Viewer / Editor</h1>

      <div className="flex">
        <SettingModal />
        <GithubButton />
      </div>
    </div>
  );
};

export default Header;
