"use client";
import GithubButton from "./json/components/github-buttom";
import SettingModal from "./modal/settings";
import { Code, Braces } from "lucide-react";

const Header = () => {
  return (
    <div className="flex mb-6  justify-between items-center  sticky top-0 z-10">
      <div className="flex items-center gap-2 pl-4">
        <div className="flex items-center justify-center bg-gray-700 text-white p-1.5 rounded-md">
          <Braces className="h-5 w-5" />
        </div>
        <h1 className="text-xl font-bold py-5 px-1 text-gray-800 flex items-center">
          <span>JSON Viewer</span>
          <span className="mx-2 text-gray-300">/</span>
          <span className="text-gray-600">Editor</span>
        </h1>
      </div>

      <div className="flex items-center gap-2 mr-4">
        <SettingModal />
        <GithubButton />
      </div>
    </div>
  );
};

export default Header;
