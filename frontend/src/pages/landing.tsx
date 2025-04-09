import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPaperPlane,
  faPaperclip,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

import ToggleTheme from "../components/toggleTheme";
import { initializeSocket } from "../utils/socket";
import { websites, examplePrompts } from "../utils/mock/mockDB";
import { resetChat, addTask } from "../redux/chatSlice";
import { resetSocket } from "../redux/socketSlice";

const apiUrl = process.env.REACT_APP_API_URL;

function Landing(): React.ReactElement {
  const [prompt, setPrompt] = useState("");
  const [agentCount, setAgentCount] = useState(1);
  const [network, setNetwork] = useState("Autoppia");
  const [initialUrl, setInitialUrl] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const returnHome = () => {
    window.location.href = "https://autoppia.com/";
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
      setPrompt("");
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
          targetAgent: network,
          agentCount: agentCount,
        }),
      });
      if (res.status === 200) {
        const data = await res.json();
        dispatch(resetSocket());
        dispatch(resetChat());
        dispatch(addTask(prompt));
        data.endpoints.forEach((endpoint: string) => {
          const socket = initializeSocket(dispatch, endpoint);
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
    <div className="w-[100vw] h-[100vh] flex relative overflow-auto">
      <div className="fixed w-full h-full hidden dark:block">
        <img
          src="./assets/images/bg/dark-bg.png"
          alt="dark background"
          className="w-full h-full"
        ></img>
      </div>
      <div className="flex flex-col px-10 lg:px-10 xl:px-20 flex-grow h-full relative w-[100vw]">
        <div className="relative flex justify-between items-center mt-10 mb-10">
          <img
            src="./assets/images/logos/main_dark.png"
            alt="dark logo"
            className="h-[20px] md:h-[24px] dark:block hidden"
          />
          <img
            src="./assets/images/logos/main.png"
            alt="main logo"
            className="h-[20px] md:h-[24px] dark:hidden block"
          />
          <div className="flex items-center ms-2 md:ms-0">
            <ToggleTheme />
            <div
              className="flex hover:bg-gray-300 rounded-full justify-center items-center w-[30px] h-[30px] cursor-pointer transition-all duration-300 text-gray-500 dark:text-white ms-4"
              onClick={returnHome}
            >
              <FontAwesomeIcon icon={faHome} />
            </div>
            <div className="flex rounded-full justify-center items-center w-[40px] h-[40px] border-2 border-gray-500 cursor-pointer text-gray-500 dark:text-white ms-4">
              <p className="text-2xl">U</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center flex-grow">
          <h1 className="w-full text-center mb-4 text-3xl md:text-4xl font-semibold dark:text-white">
            Web Operator by Autoppia
          </h1>
          <p className="w-full text-center mb-8 text-xl md:text-2xl font-semibold text-gray-600 dark:text-gray-300">
            How can I assist you today?
          </p>
          <div className="flex justify-end w-[100%] lg:w-[800px] mb-2 me-8">
            <label>
              <div className="relative w-full">
                <select
                  name="network"
                  id="network"
                  className="w-full rounded-full shadow-sm py-1 ps-3 pe-8 bg-gray-300 appearance-none -webkit-appearance-none -moz-appearance-none"
                  defaultValue="Autoppia"
                  onChange={(e) => setNetwork(e.target.value)}
                >
                  <option value="Autoppia">Autoppia Server</option>
                  <option value="Bittensor">Bittensor s36 Miners</option>
                </select>
                <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon
                    icon={faAngleDown}
                  />
                </span>
              </div>
            </label>
            <label className="ms-2">
              <div className="relative w-full">
                <select
                  name="agentCount"
                  id="agentCount"
                  className="w-full rounded-full shadow-sm py-1 ps-3 pe-8 bg-gray-300 appearance-none -webkit-appearance-none -moz-appearance-none"
                  defaultValue={1}
                  onChange={(e) => setAgentCount(parseInt(e.target.value))}
                >
                  <option value={1}>1 x Agent</option>
                  <option value={2}>2 x Agent</option>
                  <option value={4}>4 x Agent</option>
                </select>
                <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                  <FontAwesomeIcon
                    icon={faAngleDown}
                  />
                </span>
              </div>
            </label>
          </div>
          <div className="flex flex-col p-3 bg-white rounded-3xl w-[100%] lg:w-[800px] self-center shadow-md border border-gray-300 group focus-within:shadow-lg focus-within:border-gray-500">
            <div className="flex items-start flex-grow">
              {" "}
              <input
                className="border-none outline-none flex-grow text-gray-900 p-2"
                placeholder="Ask me anything..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div
                className="hover:bg-gray-100 rounded-full w-[50px] h-[50px] flex md:hidden justify-center items-center transition-all duration-200 cursor-pointer"
                onClick={handleSubmit}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between mt-3 items-center">
              <label className="w-full">
                <div className="relative ms-4 me-4">
                  <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faPaperclip}
                      className="text-gray-500"
                    />
                  </span>
                  <input
                    type="text"
                    id="website"
                    list="websiteList"
                    placeholder="Website URL..."
                    className="w-full border-none outline-none rounded-xl border-gray-300 shadow-sm px-10 py-2 bg-gray-200/50 [&::-webkit-calendar-picker-indicator]:opacity-0"
                    onChange={(e) => setInitialUrl(e.target.value)}
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className="text-gray-500"
                    />
                  </span>
                </div>

                <datalist id="websiteList">
                  {websites.map((website, index) => (
                    <option key={`website_${index}`} value={website.url}>{website.title}</option>
                  ))}
                </datalist>
              </label>

              <div
                className="hover:bg-gray-100 rounded-full w-[50px] h-[50px] hidden justify-center items-center transition-all duration-200 cursor-pointer md:flex"
                onClick={handleSubmit}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full xl:w-[80%] self-center mt-10 mb-10 gap-4 md:gap-8">
            {examplePrompts.map((item, index) => (
              <div
                className="border-[1px] border-gray-400 border-dashed shadow-sm px-10 py-8 rounded-md cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-200 dark:text-white"
                key={`example_prompt_${index}`}
                onClick={() => setPrompt(item.prompt)}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="me-2"
                ></FontAwesomeIcon>
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
