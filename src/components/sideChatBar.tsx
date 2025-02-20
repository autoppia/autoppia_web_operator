import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import {
  faBook,
  faClock,
  faDollar,
  faPaperclip,
  faPaperPlane,
  faPlus,
  faSignIn,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DB } from "../utils/mock/modkDB";
import OperatorResponse from "./operatorResponse";
import UserMsg from "./userMsg";

function SideChatBar() {
  return (
    <div className="w-[30%] transition-all duration-300 h-full bg-black px-5 py-10 flex flex-col overflow-hidden">
      <div className="header  flex flex-col items-center justify-center">
        <img
          src="./assets/images/logos/logo.png"
          className="w-[50px] h-[50px]"
        />
        <h3 className="text-white text-2xl  ">Autoppia Operator</h3>
      </div>
      <div
        className="w-full px-5 flex flex-col mt-10 justify-between flex-grow overflow-auto mb-5 
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100/20
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300/40
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        <div className="flex flex-col">
          {DB.messages.map((message, index) => {
            if (message.role == "assistant")
              return <OperatorResponse key={index} {...message} />;
            else return <UserMsg key={index} content={message.content} />;
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="p-3 flex flex-col bg-white rounded-lg relative">
          <input
            className="border-none outline-none"
            placeholder="Type here ..."
          ></input>
          <div className="flex justify-between">
            <div className=" hover:bg-gray-100 rounded-full w-[40px] h-[40px] flex justify-center items-center transition-all duration-200 cursor-pointer">
              <FontAwesomeIcon icon={faPaperclip} color="gray" />
            </div>
            <div className=" hover:bg-gray-100 rounded-full w-[40px] h-[40px] flex justify-center items-center transition-all duration-200 cursor-pointer">
              <FontAwesomeIcon icon={faPaperPlane} color="gray" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideChatBar;
