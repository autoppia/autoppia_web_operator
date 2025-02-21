import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMicrophone,
  faPaperclip,
  faPaperPlane,
  faSignIn,
  faSignOut,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

import { faComments } from "@fortawesome/free-regular-svg-icons";
import ToggleTheme from "../components/toggleTheme";
import SideChatBar from "../components/sideChatBar";

function Operator(): React.ReactElement {
  const [showSideBar, setShowSideBar] = React.useState(
    window.screen.width > 1000
  );

  const sideBarHandler = () => {
    setShowSideBar(!showSideBar);
  };
  return (
    <div className="dark:bg-[#050608] bg-[#f1f5f9] w-[100vw] h-[100vh] flex">
      <SideChatBar open={showSideBar} onClick={sideBarHandler}></SideChatBar>
      <div
        className={`flex flex-col px-5 md:px-10 lg:px-20 xl:px-40 py-20 h-full relative justify-between pb-20  ${
          showSideBar ? "md:w-[65vw] xl:w-[70vw]" : "w-[100vw]"
        }`}
      >
        <div className="flex absolute top-10 left-10 hover:bg-gray-300 rounded-full justify-center items-center w-[50px] h-[50px] cursor-pointer transition-all duration-300 dark:text-white">
          <FontAwesomeIcon icon={faBars} onClick={() => sideBarHandler()} />
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
          <img
            src="./assets/images/sites/site_1.png"
            className="w-full h-full"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Operator;
