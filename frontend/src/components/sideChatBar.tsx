import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faEdit,
  faUser,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

import ToggleTheme from "./toggleTheme";
import IconButton from "./iconButton";
import OperatorResponse from "./operatorResponse";
import UserMsg from "./userMsg";
import { I_SideBar } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { addTask } from "../redux/chatSlice";

function SideChatBar(props: I_SideBar) {
  const { open, toggleSideBar } = props;

  const [imageLoading, setImageLoading] = useState(true);
  const [task, setTask] = useState("");
  const [dlgOpen, setDlgOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chats = useSelector((state: any) => state.chat.chats);
  const sockets = useSelector((state: any) => state.socket.sockets);
  const socketIds = useSelector((state: any) => state.socket.socketIds);
  const completed = useSelector((state: any) => state.chat.completed);

  const handleSubmit = () => {
    sockets.forEach((socket: any) => {
      socket.emit("continue-task", {
        task: task,
      });
    });
    dispatch(addTask(task));
    setTask("");
  };
  const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
      setTask("");
    }
  };
  const handleError = () => {
    setImageLoading(true);
  };
  const handleLoad = () => {
    setImageLoading(false);
  };
  const handleNew = () => {
    setDlgOpen(true);
  };
  const handleYes = () => {
    navigate("/");
  };

  return (
    <div
      className={`${
        open
          ? "fixed w-[100vw] h-[100vh] px-2 sm:px-4 md:px-8 md:relative lg:w-[500px] z-10"
          : "fixed w-[100vw] h-[100vh] px-2 sm:px-4 md:px-8 lg:px-0 md:relative lg:w-0 z-10"
      } transition-all duration-300 h-full pt-1 pb-1 flex flex-col overflow-hidden bg-secondary shadow-md dark:bg-transparent dark:shadow-gray-100`}
    >
      <div className="flex items-center py-4">
        <IconButton
          icon={faBars}
          onClick={toggleSideBar}
          className="dark:text-white"
        />
        <div className="flex-grow ms-4">
          <img
            src="./assets/images/logos/main_dark.webp"
            alt=""
            className="h-[18px] dark:block hidden"
          />
          <img
            src="./assets/images/logos/main.webp"
            alt=""
            className="h-[18px] dark:hidden block"
          />
        </div>
        <IconButton
          icon={faEdit}
          onClick={handleNew}
          className="dark:text-white"
        />
        <ToggleTheme />
      </div>
      <div
        className="w-full px-2 flex flex-col mt-2 flex-grow overflow-auto mb-5 
                  [&::-webkit-scrollbar]:w-2
                  [&::-webkit-scrollbar-track]:rounded-full
                  [&::-webkit-scrollbar-track]:bg-gray-100/20
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-gray-300/40
                  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        <div className="flex flex-col flex-grow">
          {chats.map((message: any, index: number) => {
            if (message.role === "assistant")
              return (
                <OperatorResponse key={"OperationRES" + index} {...message} />
              );
            else return <UserMsg key={"UserRES" + index} {...message} />;
          })}
        </div>
        {socketIds.map((socketId: any) => (
          <div
            className="flex flex-col relative bg-white rounded-xl w-full self-center flex-shrink-0 h-auto mt-2 overflow-auto lg:hidden shadow-lg border-2 border-gray-300"
            key={`${socketId}_screenshot_side`}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <img
              id={`${socketId}_screenshot_side`}
              alt=""
              className="w-full h-auto screenshot"
              onError={handleError}
              onLoad={handleLoad}
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
            {!imageLoading ? (
              <></>
            ) : (
              <div
                role="status"
                className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 scale-150"
              >
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="black"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center px-1 mb-4">
        <div
          className={`flex justify-center items-center p-3 rounded-full
                      transition-all duration-200 cursor-pointer text-gray-700 text-white
                      bg-gradient-primary`}
        >
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="ps-4 pe-1 flex flex-grow bg-white rounded-full relative ms-2 border border-gray-300">
          <input
            className="border-none outline-none flex-grow"
            placeholder="Type here ..."
            value={task}
            disabled={completed < socketIds.length}
            onChange={handleChangeTask}
            onKeyDown={handleKeyDown}
          ></input>
          <div
            className="hover:bg-gray-100 text-gray-700 rounded-full w-[35px] h-[35px] flex justify-center items-center transition-all duration-200 cursor-pointer"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </div>
        </div>
      </div>
      {dlgOpen && (
        <div
          id="alertDialog"
          className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[360px]">
            <h2 className="w-full text-center text-xl font-semibold mb-2">Are you sure?</h2>
            <p className="w-full text-center mb-6">Do you want to start new task?</p>
            <div className="flex justify-center">
              <button
                className="bg-white hover:bg-gray-100 border border-[#FF7E5F] text-gray-800 px-4 py-1 rounded-full w-24"
                onClick={() => setDlgOpen(false)}
              >
                No
              </button>
              <button
                className="bg-gradient-primary hover:opacity-90 border border-primary text-white px-4 py-1 rounded-full w-24 ms-4"
                onClick={handleYes}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideChatBar;
