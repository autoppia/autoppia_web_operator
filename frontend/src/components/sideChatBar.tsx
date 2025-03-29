import {
  faBars,
  faEdit,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import OperatorResponse from "./operatorResponse";
import UserMsg from "./userMsg";
import { I_SideBar } from "../utils/types";
import React, { useEffect, useState } from "react";
import ToggleTheme from "./toggleTheme";
import { useNavigate } from "react-router-dom";
import { addTask } from "../redux/chatSlice";

function SideChatBar(props: I_SideBar) {
  const { open, onClick } = props;

  const [imageLoading, setImageLoading] = useState(true);
  const [task, setTask] = useState("");
  const [dlgOpen, setDlgOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chats = useSelector((state: any) => state.chat.chats);
  const sockets = useSelector((state: any) => state.socket.sockets);
  const socketIds = useSelector((state: any) => state.socket.socketIds);
  const completed = useSelector((state: any) => state.chat.completed);
  const handleClickMenuBar = () => {
    onClick();
  };

  const handleSubmit = () => {
    sockets.forEach((socket: any) => {
      socket.emit("continue-task", {
        task: task,
      });
    });
    dispatch(addTask(task))
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
  }
  const handleYes = () => {
    navigate("/");
  }

  return (
    <div
      className={`${open
        ? "fixed w-[100vw] h-[100vh] px-1 md:relative md:w-[45vw] xl:w-[35vw] z-10"
        : "fixed w-[100vw] h-[100vh] md:w-0 px-1 md:px-0 md:relative z-10"
        }  transition-all duration-300 h-full bg-white pt-1 pb-1 flex flex-col overflow-hidden dark:bg-transparent dark:shadow-sm dark:shadow-gray-100`}
    >
      <div className="flex items-center p-4">
        <div
          className="flex hover:bg-gray-300 rounded-full justify-center items-center w-[30px] h-[30px] cursor-pointer transition-all duration-300 text-gray-500 dark:text-white me-3"
          onClick={handleClickMenuBar}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="flex-grow">
          <img
            src="./assets/images/logos/main_dark.png"
            className="h-[18px] dark:block hidden"
          />
          <img
            src="./assets/images/logos/main.png"
            className="h-[18px] dark:hidden block"
          />
        </div>        
        <div
          className="flex hover:bg-gray-300 rounded-full justify-center items-center w-[30px] h-[30px] cursor-pointer transition-all duration-300 text-gray-500 dark:text-white me-2"
          onClick={handleNew}
        >
          <FontAwesomeIcon icon={faEdit} />
        </div>
        <ToggleTheme />
      </div>
      <div
        className="w-full px-5 flex flex-col mt-2 justify-between flex-grow overflow-auto mb-5 
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100/20
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300/40
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        <div className="flex flex-col">
          {chats.map((message: any, index: number) => {
            if (message.role == "assistant")
              return (
                <OperatorResponse key={"OperationRES" + index} {...message} />
              );
            else
              return (
                <UserMsg key={"UserRES" + index} {...message} />
              );
          })}
        </div>
        {socketIds.map((socketId: any, index: Number) => (
          <div
            className="relative flex flex-col p-5 justify-center bg-white rounded-xl w-full self-center flex-grow min-h-[300px] max-h-[500px] mt-5 overflow-auto md:hidden shadow-lg border-2 border-gray-300 
                      [&::-webkit-scrollbar]:w-2
                      [&::-webkit-scrollbar-track]:rounded-full
                      [&::-webkit-scrollbar-track]:bg-gray-100
                      [&::-webkit-scrollbar-thumb]:rounded-full
                      [&::-webkit-scrollbar-thumb]:bg-gray-300
                      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
            key={`${socketId}_screenshot_side`}
          >
            <img
              id={`${socketId}_screenshot_side`}
              className="w-full screenshot"
              onError={handleError}
              onLoad={handleLoad}
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
          </div>))
        }
      </div>
      <div className="flex flex-col px-1 mb-4">
        <div className="px-3 flex  bg-gray-200 rounded-lg relative">
          <input
            className="border-none outline-none bg-gray-200 flex-grow"
            placeholder="Type here ..."
            value={task}
            disabled={completed < socketIds.length}
            onChange={handleChangeTask}
            onKeyDown={handleKeyDown}
          ></input>

          <div
            className=" hover:bg-gray-100 rounded-full w-[40px] h-[40px] flex justify-center items-center transition-all duration-200 cursor-pointer"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faPaperPlane} color="gray" />
          </div>
        </div>
      </div>
      {
        dlgOpen &&
        <div id="alertDialog" className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p className="mb-4">Do you want to start new task?</p>
            <div className="flex justify-end">
              <button id="noButton" className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2" onClick={() => setDlgOpen(false)}>
                No
              </button>
              <button id="yesButton" className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleYes}>
                Yes
              </button>
            </div>
          </div>
        </div>
      }

    </div>
  );
}

export default SideChatBar;
