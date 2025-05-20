import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPaperPlane,
  faAngleDown,
  faPaperclip,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import ToggleTheme from "../components/toggleTheme";
import { initializeSocket } from "../utils/socket";
import { websites, bittensorPrompts, generalPrompts } from "../utils/mock/mockDB";
import { resetChat, addTask } from "../redux/chatSlice";
import { resetSocket } from "../redux/socketSlice";
import IconButton from "../components/iconButton";

const apiUrl = process.env.REACT_APP_API_URL;

function Landing(): React.ReactElement {
  const [prompt, setPrompt] = useState("");
  const [agentCount, setAgentCount] = useState(1);
  const [openedDropdown, setOpenedDropdown] = useState<string | null>(null);
  const [initialUrl, setInitialUrl] = useState("");
  const [filteredWebsites, setFilteredWebsites] = useState(websites);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  let sliderRef = useRef<Slider | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const settings = {
    accessibility: false,
    infinite: true,
    arrows: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => {
      setSlideIndex(next)
    }
  };

  const returnHome = () => {
    window.location.href = "https://autoppia.com/";
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
      setPrompt("");
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInitialUrl(value);

    if (value) {
      const filtered = websites.filter((website) =>
        website.url.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredWebsites(filtered);
      setOpenedDropdown("initialUrl")
    } else {
      setFilteredWebsites([]);
      setOpenedDropdown(null);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${apiUrl}/operator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agentCount: agentCount,
        }),
      });
      if (res.status === 200) {
        const data = await res.json();
        dispatch(resetSocket());
        dispatch(resetChat());
        dispatch(addTask(prompt));
        data.socketioPaths.forEach((socketioPath: string) => {
          const socket = initializeSocket(dispatch, socketioPath);
          socket.emit("new-task", {
            task: prompt,
            url: initialUrl,
          });
        });
        navigate("/home");
      } else {
        const errorData = await res.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex relative overflow-auto bg-secondary">
      {openedDropdown !== null && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-transparent z-10"
          onClick={() => setOpenedDropdown(null)}
        ></div>
      )}
      <div className="fixed w-full h-full hidden dark:block">
        <img
          src="./assets/images/bg/dark-bg.webp"
          alt=""
          className="w-full h-full"
        ></img>
      </div>
      <div className="flex flex-col px-6 md:px-12 xl:px-16 flex-grow h-full relative w-[100vw]">
        <div className="relative flex justify-between items-center mt-8 mb-8">
          <img
            src="./assets/images/logos/main_dark.webp"
            alt=""
            className="h-[16px] sm:h-[20px] dark:block hidden"
          />
          <img
            src="./assets/images/logos/main.webp"
            alt=""
            className="h-[16px] sm:h-[20px] dark:hidden block"
          />
          <div className="flex items-center ms-2 md:ms-0">
            <IconButton
              onClick={returnHome}
              icon={faHome}
              className="dark:text-white"
            />
            <ToggleTheme />
            <div className="mx-1 sm:mx-4 w-1 h-[20px] border-l-2 border-gray-300 box-border"></div>
            <div
              className={`flex justify-center items-center p-2 sm:p-3 rounded-full
                  transition-all duration-200 cursor-pointer text-gray-700 text-white
                  bg-gradient-primary`}
            >
              <FontAwesomeIcon icon={faUser} />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center flex-grow">
          <h2 className="w-full text-center mb-4 text-3xl md:text-4xl leading-tight font-bold text-gray-700 dark:text-white tracking-wide">
            Fully Permissionless and Incentivized{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">Web&nbsp;Operator</span>
          </h2>
          <h2 className="w-full text-center mb-4 text-2xl md:text-[2rem] font-semibold text-gray-700 dark:text-white tracking-wide">
            Powered by&nbsp;
            <a
              href="https://bittensor.com"
              className="font-bold text-gradient-secondary border-b-2 border-gray-700 dark:border-white"
            >
              <span className="bg-gradient-secondary bg-clip-text text-transparent">Bittensor</span>
            </a>
          </h2>
          <p className="w-full text-center mb-8 text-lg md:text-xl font-semibold text-gray-600 dark:text-gray-300">
            What can I help you with?
          </p>

          <div className="flex justify-end w-[100%] xl:w-[1000px] mb-4 me-2 mt-12">
            <label className="ms-2">
              <div className="relative w-full text-sm font-medium">
                <button
                  type="button"
                  className="w-[170px] text-left rounded-full shadow-sm py-1 ps-3 text-white bg-gradient-primary outline-none appearance-none -webkit-appearance-none -moz-appearance-none"
                  onClick={() => setOpenedDropdown("network")}
                >
                  Autoppia Validator
                  <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faAngleDown} />
                  </span>
                </button>
                <div
                  style={{
                    display: openedDropdown === "network" ? "block" : "none",
                  }}
                  className="absolute z-20 mt-1 w-full rounded-lg bg-white shadow-lg"
                >
                  <div className="p-1">
                    <button
                      className="block p-2 text-sm rounded-lg text-gray-700 hover:bg-gradient-primary hover:text-white w-full text-left"
                      onClick={() => setOpenedDropdown(null)}
                    >
                      Autoppia Validator
                    </button>
                  </div>
                </div>
              </div>
            </label>
            <label className="ms-2">
              <div className="relative w-full text-sm font-medium">
                <button
                  type="button"
                  className="w-[105px] text-left rounded-full shadow-sm py-1 ps-3 pe-7 text-white bg-gradient-primary outline-none appearance-none -webkit-appearance-none -moz-appearance-none"
                  onClick={() => setOpenedDropdown("agentCount")}
                >
                  {`${agentCount} x Agent`}
                  <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faAngleDown} />
                  </span>
                </button>
                <div
                  style={{
                    display: openedDropdown === "agentCount" ? "block" : "none",
                  }}
                  className="absolute z-20 mt-1 w-full rounded-lg bg-white shadow-lg"
                >
                  <div className="p-1">
                    {[1, 2, 4].map((option) => (
                      <button
                        key={option}
                        className="block p-2 text-sm rounded-lg text-gray-700 hover:bg-gradient-primary hover:text-white w-full text-left"
                        onClick={() => {
                          setAgentCount(option);
                          setOpenedDropdown(null);
                        }}
                      >
                        {`${option} x Agent`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </label>
          </div>
          <div className="flex flex-col p-3 bg-white rounded-2xl w-[100%] xl:w-[1000px] self-center shadow-md border border-gray-300 group focus-within:shadow-lg focus-within:border-gray-500">
            <div className="flex items-start flex-grow">
              {" "}
              <input
                className="border-none outline-none flex-grow text-gray-900 p-2"
                placeholder="Ask me anything..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between mt-3 items-center gap-2">
              <label className="relative w-full">
                <div className="flex items-center gap-2">
                  <IconButton
                    icon={faPaperclip}
                    className="dark:text-gray-700"
                  />
                  <div className="flex flex-grow px-4 py-2 grow items-center rounded-full border-gray-300 border-[1px] shadow-sm">
                    {" "}
                    <input
                      type="text"
                      placeholder="Website URL..."
                      className="w-full outline-none bg-none"
                      value={initialUrl}
                      onChange={handleUrlChange}
                    />
                    <div className="inset-y-0 right-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon
                        icon={faAngleDown}
                        className="text-gray-500"
                      />
                    </div>
                  </div>
                  <IconButton
                    icon={faPaperPlane}
                    onClick={handleSubmit}
                    disabled={!prompt}
                    className="dark:text-gray-700"
                  />
                </div>
                <div
                  style={{
                    display: openedDropdown === "initialUrl" ? "block" : "none",
                  }}
                  className="absolute z-20 mt-1 w-[calc(100%-100px)] mx-[50px] rounded-lg bg-white shadow-lg"
                >
                  <div className="p-1">
                    {filteredWebsites.map((website) => (
                      <div
                        key={website.url}
                        className="cursor-pointer p-2 rounded-lg flex items-center hover:bg-gradient-primary hover:text-white"
                        onClick={() => {
                          setInitialUrl(website.url);
                          setFilteredWebsites([]);
                          setOpenedDropdown(null);
                        }}
                      >
                        <FontAwesomeIcon icon={website.icon} className="me-3" />
                        {website.title}
                      </div>
                    ))}
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="w-full xl:w-[1000px] mx-auto my-4">
            <Slider
              ref={slider => {
                sliderRef.current = slider;
              }}
              {...settings}
            >

              <div className="py-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {bittensorPrompts.map((item, index) => (
                    <div
                      className="border border-gray-400 border-dashed shadow-sm px-4 py-4 rounded-2xl cursor-pointer   
                           hover:-translate-y-1 hover:shadow-lg transition-transform duration-200 dark:text-white flex items-center gap-2"
                      key={`group-one-prompt-${index}`}
                      onClick={() => {
                        setPrompt(item.prompt);
                        setInitialUrl(item.url);
                      }}
                    >
                      <div className="flex items-center justify-center bg-gradient-primary p-3 rounded-full me-2">
                        <FontAwesomeIcon icon={item.icon} className="text-white" />
                      </div>
                      <div>{item.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="py-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {generalPrompts.map((item, index) => (
                    <div
                      className="border border-gray-400 border-dashed shadow-sm px-4 py-4 rounded-2xl cursor-pointer   
                           hover:-translate-y-1 hover:shadow-lg transition-transform duration-200 dark:text-white flex items-center gap-2"
                      key={`group-two-prompt-${index}`}
                      onClick={() => {
                        setPrompt(item.prompt);
                        setInitialUrl(item.url);
                      }}
                    >
                      <div className="flex items-center justify-center bg-gradient-primary p-3 rounded-full me-2">
                        <FontAwesomeIcon icon={item.icon} className="text-white" />
                      </div>
                      <div>{item.title}</div>
                    </div>
                  ))}
                </div>
              </div>

            </Slider>
            <div className="flex justify-center mt-1 mb-1 w-full">
              <div className="flex justify-around w-20">
                <div
                  className={
                    "w-8 h-1 rounded-full hover:bg-gray-600 dark:hover:bg-gray-400 " +
                    (slideIndex === 0 ? "bg-gray-700 dark:bg-white" : "bg-gray-400 dark:bg-gray-600")
                  }
                  onClick={() => sliderRef.current?.slickGoTo(0)}
                />
                <div
                  className={
                    "w-8 h-1 rounded-full hover:bg-gray-600 dark:hover:bg-gray-400 " +
                    (slideIndex === 1 ? "bg-gray-700 dark:bg-white" : "bg-gray-400 dark:bg-gray-600")
                  }
                  onClick={() => sliderRef.current?.slickGoTo(1)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
