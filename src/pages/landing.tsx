import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMicrophone,
  faPaperclip,
  faPaperPlane,
  faSignIn,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

import { faComments } from "@fortawesome/free-regular-svg-icons";
import SideBar from "../components/sideBar";
import ToggleTheme from "../components/toggleTheme";

function Landing(): React.ReactElement {
  return (
    <div className="bg-[#f1f5f9] w-[100vw] h-[100vh] flex">
      <SideBar></SideBar>
      <div className="flex flex-col px-40 justify-center h-full relative">
        <div className="flex absolute top-10 left-10 hover:bg-gray-300 rounded-full justify-center items-center w-[50px] h-[50px] cursor-pointer transition-all duration-300">
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="absolute flex top-10 right-10">
          <ToggleTheme />
          <div className="px-8 flex items-center hover:bg-white hover:text-black hover:shadow-lg hover:border-transparent rounded-full border-[1px] border-gray-300 justify-center items-center  cursor-pointer transition-all duration-300">
            <div className="mr-2">Login</div>
            <FontAwesomeIcon icon={faSignIn} />
          </div>
        </div>
        <h1 className="w-full text-center mb-10 text-4xl font-semibold">
          What do you want today?
        </h1>
        <div className="flex flex-col p-5  bg-white rounded-xl w-[60%] self-center shadow-md">
          <input
            className="border-none outline-none"
            placeholder="You can upload the video, images or other files"
          ></input>
          <div className="flex justify-between mt-5">
            <div className="flex">
              <div className=" hover:bg-gray-100 rounded-full w-[50px] h-[50px] flex justify-center items-center transition-all duration-200 cursor-pointer">
                <FontAwesomeIcon icon={faPaperclip} color="333333" />
              </div>

              <div className=" hover:bg-gray-100 rounded-full w-[50px] h-[50px] flex justify-center items-center transition-all duration-200 cursor-pointer">
                <FontAwesomeIcon icon={faMicrophone} />
              </div>
            </div>
            <div className=" hover:bg-gray-100 rounded-full w-[50px] h-[50px] flex justify-center items-center transition-all duration-200 cursor-pointer">
              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 w-[80%] self-center mt-10 gap-8">
          <div className="border-[1px] border-gray-400 border-dashed shadow-sm p-10 rounded-md cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-200">
            <FontAwesomeIcon
              icon={faComments}
              className="p-1"
            ></FontAwesomeIcon>
            Find the Best Solution for Using AI Operator.
          </div>
          <div className="border-[1px] border-gray-400 border-dashed shadow-sm p-10 rounded-md cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-200">
            <FontAwesomeIcon
              icon={faComments}
              className="p-1"
            ></FontAwesomeIcon>
            Find the Best Solution for Using AI Operator.
          </div>
          <div className="border-[1px] border-gray-400 border-dashed shadow-sm p-10 rounded-md cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-200">
            <FontAwesomeIcon
              icon={faComments}
              className="p-1"
            ></FontAwesomeIcon>
            Find the Best Solution for Using AI Operator.
          </div>
          <div className="border-[1px] border-gray-400 border-dashed shadow-sm p-10 rounded-md cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-200">
            <FontAwesomeIcon
              icon={faComments}
              className="p-1"
            ></FontAwesomeIcon>
            Find the Best Solution for Using AI Operator.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
