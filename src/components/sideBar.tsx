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

function SideBar() {
  return (
    <div className="w-[25%] transition-all duration-300 h-full bg-black px-5 py-10 flex flex-col overflow-hidden">
      <div className="header  flex flex-col items-center justify-center">
        <img
          src="./assets/images/logos/logo.png"
          className="w-[50px] h-[50px]"
        />
        <h3 className="text-white text-2xl ">Autoppia Web Operator</h3>
      </div>
      <div className="w-full px-5 flex flex-col mt-10 justify-between flex-grow ">
        <div className="flex flex-col">
          <div className="border-[1px] border-dashed border-gray-100 w-full p-3 px-10 rounded-lg flex items-center mb-5 justify-around cursor-pointer">
            <FontAwesomeIcon icon={faPlus} color="white"></FontAwesomeIcon>
            <h1 className="text-gray-100 ms-5">Start New Task</h1>
          </div>
          {/* <div className="flex flex-col mt-5">
            <h1 className="text-gray-50 font-semibold text-xl">
              Welcome to Operator!
            </h1>
            <h1 className="text-gray-300 mt-3">
              A personalized AI assistant for you.<br></br> Analyze your files,
              YouTube videos, or recorded content with ease. Extract key
              insights, summarize important details, and interact with the
              information in a way that suits you best. <br></br>We’re
              constantly enhancing the platform, and your feedback is always
              welcome!
            </h1>
          </div> */}
          <div className="flex flex-col mt-5">
            <div className="text-gray-50 font-semibold border-b-[1px] border-white">
              <FontAwesomeIcon icon={faClock} className="me-2" /> Histories
            </div>
            <div className="text-gray-300 mt-3">
              <div className="bg-gray-50/10 w-full p-3 rounded-lg mb-1 cursor-pointer">
                Tell me about ..
              </div>
              <div className="bg-gray-50/10 w-full p-3 rounded-lg mb-1 cursor-pointer">
                Tell me about ..
              </div>
              <div className="bg-gray-50/10 w-full p-3 rounded-lg mb-1 cursor-pointer">
                Tell me about ..
              </div>
              <div className="bg-gray-50/10 w-full p-3 rounded-lg mb-1 cursor-pointer">
                Tell me about ..
              </div>
              <div className="bg-gray-50/10 w-full p-3 rounded-lg mb-1 cursor-pointer">
                Tell me about ..
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col mt-5 mb-5">
            <div className="text-gray-50 font-semibold border-b-[1px] border-white">
              Help and Tools
            </div>
            <div className="text-gray-300 mt-3">
              <div className="bg-gray-50/10 w-full p-3 py-1 rounded-lg mb-1 cursor-pointer">
                <FontAwesomeIcon icon={faThumbsUp} className="me-3" />
                Comments ..
              </div>
              <div className="bg-gray-50/10 w-full p-3 py-1 rounded-lg mb-1 cursor-pointer">
                <FontAwesomeIcon icon={faBook} className="me-3" />
                Quick Guide ..
              </div>
              <div className="bg-gray-50/10 w-full p-3 py-1 rounded-lg mb-1 cursor-pointer">
                <FontAwesomeIcon icon={faDiscord} className="me-3" />
                Discord Server ..
              </div>
              <div className="bg-gray-50/10 w-full p-3 py-1 rounded-lg mb-1 cursor-pointer">
                <FontAwesomeIcon icon={faDollar} className="me-3" />
                Invite and Earn ..
              </div>
            </div>
          </div>
          {/* <div className="p-3 flex  bg-white rounded-lg relative">
            <input
              className="border-none outline-none"
              placeholder="Type here ..."
            ></input>
            <div className=" hover:bg-gray-100 rounded-full w-[30px] h-[30px] flex justify-center items-center transition-all duration-200 cursor-pointer">
              <FontAwesomeIcon icon={faPaperclip} color="gray" />
            </div>
            <div className=" hover:bg-gray-100 rounded-full w-[30px] h-[30px] flex justify-center items-center transition-all duration-200 cursor-pointer">
              <FontAwesomeIcon icon={faPaperPlane} color="gray" />
            </div>
          </div> */}

          <h1 className="text-gray-300 mt-3">Please Login</h1>
          <div className="flex justify-center items-center mt-3 border-[1px] bg-gray-300 rounded-lg py-3 px-8 cursor-pointer">
            <h1 className="me-3 font-semibold">Login</h1>
            <FontAwesomeIcon icon={faSignIn} color="333333" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
