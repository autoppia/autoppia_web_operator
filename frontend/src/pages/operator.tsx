import React, { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOut } from "@fortawesome/free-solid-svg-icons";
import ToggleTheme from "../components/toggleTheme";
import SideChatBar from "../components/sideChatBar";

function Operator(): React.ReactElement {
  const [showSideBar, setShowSideBar] = React.useState(
    window.screen.width > 1000
  );
  const [url, setUrl] = useState("");
  const [prompt, setPrompt] = useState("");

  const sideBarHandler = () => {
    setShowSideBar(!showSideBar);
  };

  useEffect(() => {
    setUrl(localStorage.getItem("url") || "");
    setPrompt(localStorage.getItem("prompt") || "");
  }, []);
  return (
    <div className="dark:bg-[#050608] bg-[#f1f5f9] w-[100%] h-[100vh] flex">
      <SideChatBar open={showSideBar} onClick={sideBarHandler}></SideChatBar>
      <div
        className={`flex flex-col px-10 py-20 h-full relative justify-between pb-20  ${
          showSideBar ? "md:w-[65vw] xl:w-[75vw]" : "w-[100vw]"
        }`}
      >
        <div
          className="flex absolute top-10 left-10 hover:bg-gray-300 rounded-full justify-center items-center w-[50px] h-[50px] cursor-pointer transition-all duration-300 dark:text-white"
          onClick={() => sideBarHandler()}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="absolute flex top-10 right-10">
          <ToggleTheme />

          <div className="flex hover:bg-gray-300 rounded-full justify-center items-center w-[50px] h-[50px] cursor-pointer transition-all duration-300 dark:text-white">
            <FontAwesomeIcon icon={faSignOut} />
          </div>
        </div>

        <div
          className={`flex flex-col p-5  bg-white rounded-xl w-full self-center shadow-md flex-grow mt-5 overflow-auto 
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}
        >
          <video playsInline autoPlay muted className="w-full h-full"></video>
        </div>
      </div>
    </div>
  );
}

export default Operator;
