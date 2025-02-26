import React, { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faBars,
  faEarth,
  faExternalLink,
  faMap,
  faMicrophone,
  faPaperclip,
  faPaperPlane,
  faSignIn,
  faSortDesc,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

import { faComments } from "@fortawesome/free-regular-svg-icons";
import SideBar from "../components/sideBar";
import ToggleTheme from "../components/toggleTheme";
import WebsiteItem from "../components/websiteItem";
import { faGoogle, faGoogleDrive } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { BACKEND_URL, socketAction } from "../store/action";
import { SOCKET_CONNECT } from "../store/types";

function Landing(): React.ReactElement {
  const [showSideBar, setShowSideBar] = React.useState(false);
  const [webURL, setWebURL] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedURL, setSelectedURL] = useState("");
  const [prompt, setPrompt] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const sideBarHandler = () => {
    setShowSideBar(!showSideBar);
  };

  const handleChangePrompt = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };
  const handleChangeWebURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWebURL(event.target.value);
  };

  const handleUnfocusedWebURL = () => {
    setSelectedURL(webURL);
  };

  const handleClickWebSiteItem = (url: string, name: string) => {
    setWebURL(name);
    setSelectedURL(url);
    setShowDropDown(false);
  };

  const startOperating = () => {
    localStorage.setItem("url", webURL);
    localStorage.setItem("prompt", prompt);
    navigate("/home");
  };

  useEffect(() => {
    if (webURL.length > 0) {
      setShowDropDown(true);
    } else {
      setShowDropDown(false);
    }
  }, [webURL]);

  useEffect(() => {
    if (!selectedURL && webURL.length > 0) {
      setShowDropDown(true);
    } else {
      setShowDropDown(false);
    }
  }, [selectedURL]);

  useEffect(() => {
    const socket = io(BACKEND_URL);
    socketAction(socket);
    dispatch({ type: SOCKET_CONNECT, payload: socket });
  }, []);
  return (
    <div className="dark:bg-[#050608] bg-[#f1f5f9] w-[100vw] h-[100vh] flex relative overflow-auto">
      <SideBar open={showSideBar} onClick={sideBarHandler}></SideBar>
      <div
        className={`flex flex-col px-10 lg:px-10 xl:px-20 flex-grow h-full relative ${
          showSideBar ? "md:w-[70vw] xl:w-[75vw]" : "w-[100vw]"
        }`}
      >
        <div className="relative flex justify-end mt-10 mb-10">
          {/* <div
            className="flex hover:bg-gray-300 rounded-full justify-center items-center w-[50px] h-[50px] cursor-pointer transition-all duration-300 dark:text-white"
            onClick={() => sideBarHandler()}
          >
            <FontAwesomeIcon icon={faBars} />
          </div> */}
          <div className="flex ">
            <ToggleTheme />
            {/* <div className="px-8 flex items-center  dark:text-white hover:bg-white hover:text-black hover:shadow-lg hover:border-transparent rounded-full border-[1px] border-gray-300 justify-center items-center  cursor-pointer transition-all duration-300">
              <div className="mr-2">Login</div>
              <FontAwesomeIcon icon={faSignIn} />
            </div> */}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center flex-grow">
          <h1 className="w-full text-center mb-10 text-4xl font-semibold dark:text-white">
            What do you want today?
          </h1>
          <div className="flex flex-col p-5  bg-white rounded-xl w-[80%] md:w-[60%] self-center shadow-md">
            <input
              className="border-none outline-none"
              placeholder="You can upload the video, images or other files"
              value={prompt}
              onChange={handleChangePrompt}
            ></input>
            <div className="flex justify-between mt-5 items-center">
              <div className="flex">
                <div className=" hover:bg-gray-100 rounded-full w-[50px] h-[50px] flex justify-center items-center transition-all duration-200 cursor-pointer">
                  <FontAwesomeIcon icon={faPaperclip} color="333333" />
                </div>

                <div className=" hover:bg-gray-100 rounded-full w-[50px] h-[50px] flex justify-center items-center transition-all duration-200 cursor-pointer">
                  <FontAwesomeIcon icon={faMicrophone} />
                </div>
              </div>
              <div className="flex flex-grow mx-10 bg-gray-200/50 px-5 py-2 rounded-lg shadow-sm items-center relative">
                <FontAwesomeIcon
                  icon={faExternalLink}
                  color="gray"
                  className="me-2"
                />
                <input
                  className="bg-transparent w-full outline-none border-none"
                  placeholder="WebSite URL..."
                  value={webURL}
                  onChange={handleChangeWebURL}
                  onBlur={handleUnfocusedWebURL}
                />
                <FontAwesomeIcon icon={faSortDesc} color="gray" />
                <div
                  className={` overflow-hidden mt-2 absolute top-full left-0 bg-gray-50 shadow-xl w-full  rounded-lg ${
                    showDropDown ? "h-auto p-5 " : "h-0 p-0"
                  }`}
                >
                  <WebsiteItem
                    title="Google Drive"
                    icon={faGoogleDrive}
                    url="https://drive.google.com/drive/my-drive"
                    onClick={handleClickWebSiteItem}
                  />
                  <WebsiteItem
                    title="Google Account Management"
                    icon={faGoogle}
                    url="https://myaccount.google.com/"
                    onClick={handleClickWebSiteItem}
                  />
                  <WebsiteItem
                    title="Google Map"
                    icon={faMap}
                    url="https://www.google.com/maps"
                    onClick={handleClickWebSiteItem}
                  />
                </div>
              </div>
              <div
                className=" hover:bg-gray-100 rounded-full w-[50px] h-[50px] flex justify-center items-center transition-all duration-200 cursor-pointer"
                onClick={startOperating}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col p-5  bg-white rounded-xl w-[80%] md:w-[60%] self-center shadow-md">
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
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full xl:w-[80%] self-center mt-10 gap-8">
            <div className="border-[1px] border-gray-400 border-dashed shadow-sm p-10 rounded-md cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-200 dark:text-white">
              <FontAwesomeIcon
                icon={faComments}
                className="p-1"
              ></FontAwesomeIcon>
              Find the Best Solution for Using AI Operator.
            </div>
            <div className="border-[1px] border-gray-400 border-dashed shadow-sm p-10 rounded-md cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-200 dark:text-white">
              <FontAwesomeIcon
                icon={faComments}
                className="p-1"
              ></FontAwesomeIcon>
              Find the Best Solution for Using AI Operator.
            </div>
            <div className="border-[1px] border-gray-400 border-dashed shadow-sm p-10 rounded-md cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-200 dark:text-white">
              <FontAwesomeIcon
                icon={faComments}
                className="p-1"
              ></FontAwesomeIcon>
              Find the Best Solution for Using AI Operator.
            </div>
            <div className="border-[1px] border-gray-400 border-dashed shadow-sm p-10 rounded-md cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-200 dark:text-white">
              <FontAwesomeIcon
                icon={faComments}
                className="p-1"
              ></FontAwesomeIcon>
              Find the Best Solution for Using AI Operator.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
