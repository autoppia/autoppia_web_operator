import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import {
  faBook,
  faClock,
  faClose,
  faDollar,
  faPaperclip,
  faPaperPlane,
  faPlus,
  faSignIn,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DB } from "../utils/mock/mockDB";
import OperatorResponse from "./operatorResponse";
import UserMsg from "./userMsg";
import { I_SideBar } from "../utils/types";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const BACKEND_URL = "http://54.195.214.72:4000";

function SideChatBar(props: I_SideBar) {
  const [chats, setChats] = useState<any>(DB.messages);
  const { open, onClick } = props;

  useEffect(() => {
    let peerConnection: RTCPeerConnection;
    const config: RTCConfiguration = {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };

    const socket = io(BACKEND_URL);
    const videoElement: HTMLVideoElement | null =
      document.querySelector("video");

    socket.on("connect", () => {
      let watcher: string = socket.id!;
      submit(watcher);
    });

    socket.on("offer", (id: string, description: RTCSessionDescriptionInit) => {
      peerConnection = new RTCPeerConnection(config);

      peerConnection
        .setRemoteDescription(new RTCSessionDescription(description))
        .then(() => peerConnection.createAnswer())
        .then((sdp: RTCSessionDescriptionInit) =>
          peerConnection.setLocalDescription(sdp)
        )
        .then(() => {
          socket.emit("answer", id, peerConnection.localDescription);
        })
        .catch((error: any) => console.error(error));

      peerConnection.ontrack = (event: RTCTrackEvent) => {
        if (videoElement) {
          videoElement.srcObject = event.streams[0];
        }
      };

      peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
          socket.emit("candidate", id, event.candidate);
        }
      };
    });

    socket.on("broadcaster", () => {
      socket.emit("watcher");
    });

    socket.on("candidate", (id: string, candidate: RTCIceCandidateInit) => {
      peerConnection
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch((error: any) => console.error(error));
    });

    window.onbeforeunload = () => {
      socket.close();
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, []);

  const submit = async (watcher: string) => {
    const startUrl = "https://autoppia.com";
    const tasks = "";

    try {
      const response = await fetch(`${BACKEND_URL}/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startUrl, tasks, watcher }),
      });
      const result = await response.json();
      console.log(result.message);
    } catch (err) {
      console.error("Failed to start:", err);
    }
  };

  return (
    <div
      className={`${
        open
          ? "fixed w-[100vw] h-[100vh] px-3 lg:px-10 lg:relative lg:w-[35vw] xl:w-[25vw] z-10"
          : "fixed w-[100vw] h-[100vh] lg:w-0  px-3 lg:px-0 lg:relative z-10"
      }  transition-all duration-300 h-full bg-black py-10 flex flex-col overflow-hidden dark:shadow-sm dark:shadow-gray-100`}
    >
      <div className="header  flex flex-col items-center justify-center">
        <img
          src="./assets/images/logos/logo.png"
          className="w-[50px] h-[50px]"
        />
        <h3 className="text-white text-2xl text-center ">Autoppia Operator</h3>
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
          {chats.map((message: any, index: number) => {
            if (message.role == "assistant")
              return <OperatorResponse key={index} {...message} />;
            else return <UserMsg key={index} content={message.content} />;
          })}
        </div>
        <div
          className={`flex flex-col p-5  bg-white rounded-xl w-full self-center shadow-md flex-grow min-h-[300px] mt-5 overflow-auto lg:hidden
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}
        >
          <video playsInline autoPlay muted className="w-full h-full"></video>
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
