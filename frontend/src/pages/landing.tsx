import React, { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faBars,
  faEarth,
  faExternalLink,
  faHome,
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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initializeSocket } from "../utils/socket";
import { websites } from "../utils/mock/mockDB";
import { I_WebSiteUrl } from "../utils/types";
import { resetChat, addTask, addAction } from "../redux/chatSlice";
import { BACKEND_URL } from "../config";
import { faWindows } from "@fortawesome/free-brands-svg-icons";

function Landing(): React.ReactElement {
  const [showSideBar, setShowSideBar] = React.useState(false);
  const [webURL, setWebURL] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedURL, setSelectedURL] = useState("");
  const [prompt, setPrompt] = useState("");
  const [agentCount, setAgentCount] = useState(1);
  const [network, setNetwork] = useState("Autoppia");
  const [filteredWebSites, setFilteredWebSites] = useState<I_WebSiteUrl[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //===========================================Handlers========================================
  //Collapse Sidebar
  const sideBarHandler = () => {
    setShowSideBar(!showSideBar);
  };

  //On change the input (prompt)
  const handleChangePrompt = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  //On Enter key down of the input (prompt)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
      setPrompt("");
    }
  };

  //On change the input (webURL)
  const handleChangeWebURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWebURL(event.target.value);
    handleFilter(event);
  };

  //const filter
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setFilteredWebSites(
      websites.filter(
        (item: I_WebSiteUrl) =>
          item.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    );
  };

  //On click the Item of the dropdown
  const handleClickWebSiteItem = (url: string, name: string) => {
    setWebURL(name);
    setSelectedURL(url);
    setShowDropDown(false);
  };

  //Navigate to next page
  const handleSubmit = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/operator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetAgent: network,
          agentCount: agentCount,
        })
      })
      if (res.status === 200) {
        const data = await res.json();
        data.endpoints.forEach((endpoint: string) => {
          const socket = initializeSocket(dispatch, endpoint);          
          socket.emit("new-task", {
            task: prompt,
            url: selectedURL,
          })
          dispatch(resetChat());
          dispatch(addTask(prompt))
          dispatch(addAction("Initialize browser."))
        });
        navigate("/home");
      } else {
        const errorData = await res.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
    };
  };

  const returnHome = () => {
    window.location.href = "https://autoppia.com/";
  };
  //===============================================================================================

  //==================================Life Cycle==========================
  //when the Prop(webURL) change
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
    window.addEventListener('click', (event) => {
      const agentCountButton = document.getElementById("agentCountButton");
      const agentCountMenu = document.getElementById("agentCountMenu");
      if(!agentCountButton?.contains(event.target as Node) && !agentCountMenu?.contains(event.target as Node)) {
        agentCountMenu?.classList.add('hidden');
      }

      const accountMenuButton = document.getElementById("accountMenuButton");
      const accountMenu = document.getElementById("accountMenu");
      if(!accountMenuButton?.contains(event.target as Node) && !accountMenuButton?.contains(event.target as Node)) {
        accountMenu?.classList.add('hidden');
      }
    })
  }, [])
  const handleDropDown = (id: string) => {
    document.getElementById(id)?.classList.toggle("hidden");
  }
  const handleDropDownMenu = (id: string, val: number|string) => {
    if(id === "agentCountMenu")
      setAgentCount(val as number);
    if(id === "networkMenu")
      setNetwork(val as string);
    const menu = document.getElementById(id);
    menu?.classList.add('hidden');
  }

  return (
    <div className="dark:bg-[#050608] bg-[#f1f5f9] w-[100vw] h-[100vh] flex relative overflow-auto">
      <div className="fixed w-full h-full hidden dark:block">
        <img
          src="./assets/images/bg/dark-bg.png"
          className="w-full h-full"
        ></img>
      </div>
      <SideBar open={showSideBar} onClick={sideBarHandler}></SideBar>
      <div
        className={`flex flex-col px-10 lg:px-10 xl:px-20 flex-grow h-full relative ${showSideBar ? "md:w-[70vw] xl:w-[75vw]" : "w-[100vw]"
          }`}
      >
        <div className="relative flex justify-between items-center mt-10 mb-10">
          <img
            src="./assets/images/logos/logo copy.png"
            className="h-[50px] dark:block hidden"
          />
          <img
            src="./assets/images/logos/logo copy.png"
            className="h-[50px] dark:hidden block"
          />
          <div className="flex ">
            <ToggleTheme />
            <div
              className="px-3 flex   dark:text-white hover:bg-white hover:text-black hover:shadow-lg hover:border-transparent rounded-full  justify-center items-center  cursor-pointer transition-all duration-300 text-gray-500"
              onClick={returnHome}
            >
              <FontAwesomeIcon icon={faHome} />
            </div>
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
              onKeyDown={handleKeyDown}
            // onFocus={handleUnfocusedWebURL}
            ></input>
            <div className="flex justify-between mt-5 items-center">
              <div className="flex flex-grow mx-1 min-[500px]:mx-3 bg-gray-200/50 px-1 py-2 rounded-lg shadow-sm items-center relative">
                <FontAwesomeIcon
                  icon={faExternalLink}
                  color="gray"
                  className="me-2 max-[400px]:hidden"
                />
                <input
                  className="bg-transparent w-full outline-none border-none"
                  placeholder="WebSite URL..."
                  value={webURL}
                  onChange={handleChangeWebURL}
                // onBlur={handleUnfocusedWebURL}
                />
                <FontAwesomeIcon icon={faSortDesc} color="gray" />
                <div
                  className={` overflow-hidden mt-2 absolute top-full left-0 bg-gray-50 shadow-xl w-full  rounded-lg ${showDropDown ? "h-auto p-5 max-[500px]:p-1 " : "h-0 p-0"
                    }`}
                >
                  {filteredWebSites.map((item: I_WebSiteUrl, index: number) => (
                    <WebsiteItem
                      key={item.title + index}
                      title={item.title}
                      icon={item.icon}
                      url={item.url}
                      onClick={handleClickWebSiteItem}
                    />
                  ))}
                </div>
              </div>
              <div className="relative flex justify-center items-center mr-1">
                <button id="networkButton" className="bg-gray-200/50 px-4 py-2 rounded items-center mr-1" onClick={() => handleDropDown("networkMenu")}>
                  <span className="mr-[5px]">{network}</span>
                  <FontAwesomeIcon className="pl-1" icon={faSortDesc} />
                </button>
                <div id="networkMenu" className="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                  <div className="hover:bg-gray-200 cursor-pointer p-1  flex items-center border-b-[1px]" onClick={() => handleDropDownMenu("networkMenu", "Autoppia")}>
                    Autoppia
                  </div>
                  <div className="hover:bg-gray-200 cursor-pointer p-1  flex items-center border-b-[1px]" onClick={() => handleDropDownMenu("networkMenu", "Bittensor")}>
                    Bittensor
                  </div>
                </div>
              </div>
              <div className="relative flex justify-center items-center mr-1">
                <button id="agentCountButton" className="bg-gray-200/50 px-4 py-2 rounded items-center mr-1" onClick={() => handleDropDown("agentCountMenu")}>
                  <span className="mr-[5px]">{agentCount}X</span>
                  <FontAwesomeIcon className="pl-1" icon={faSortDesc} />
                </button>
                <div id="agentCountMenu" className="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                  <div className="hover:bg-gray-200 cursor-pointer p-1  flex items-center border-b-[1px]" onClick={() => handleDropDownMenu("agentCountMenu", 1)}>
                    1X
                  </div>
                  <div className="hover:bg-gray-200 cursor-pointer p-1  flex items-center border-b-[1px]" onClick={() => handleDropDownMenu("agentCountMenu", 2)}>
                    2X
                  </div>
                  <div className="hover:bg-gray-200 cursor-pointer p-1  flex items-center border-b-[1px]" onClick={() => handleDropDownMenu("agentCountMenu", 4)}>
                    4X
                  </div>
                </div>
              </div>
              <div
                className=" hover:bg-gray-100 rounded-full w-[50px] h-[50px] flex justify-center items-center transition-all duration-200 cursor-pointer"
                onClick={handleSubmit}
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
