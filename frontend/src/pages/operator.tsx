import React, { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOut } from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";

import { faComments } from "@fortawesome/free-regular-svg-icons";
import ToggleTheme from "../components/toggleTheme";
import SideChatBar from "../components/sideChatBar";

const BACKEND_URL = "http://54.195.214.72:4000";

function Operator(): React.ReactElement {
  const [showSideBar, setShowSideBar] = React.useState(
    window.screen.width > 1000
  );
  const [url, setUrl] = useState("");
  const [prompt, setPrompt] = useState("");

  const sideBarHandler = () => {
    setShowSideBar(!showSideBar);
  };

  useEffect(() => {
    setUrl(localStorage.getItem("url") || "");
    setPrompt(localStorage.getItem("prompt") || "");
  }, []);
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
    <div className="dark:bg-[#050608] bg-[#f1f5f9] w-[100%] h-[100vh] flex">
      <SideChatBar open={showSideBar} onClick={sideBarHandler}></SideChatBar>
      <div
        className={`flex flex-col px-10 py-20 h-full relative justify-between pb-20  ${
          showSideBar ? "md:w-[65vw] xl:w-[75vw]" : "w-[100vw]"
        }`}
      >
        <div
          className="flex absolute top-10 left-10 hover:bg-gray-300 rounded-full justify-center items-center w-[50px] h-[50px] cursor-pointer transition-all duration-300 dark:text-white"
          onClick={() => sideBarHandler()}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="absolute flex top-10 right-10">
          <ToggleTheme />

          <div className="flex hover:bg-gray-300 rounded-full justify-center items-center w-[50px] h-[50px] cursor-pointer transition-all duration-300 dark:text-white">
            <FontAwesomeIcon icon={faSignOut} />
          </div>
        </div>

        <div
          className={`flex flex-col p-5  bg-white rounded-xl w-full self-center shadow-md flex-grow mt-5 overflow-auto 
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
    </div>
  );
}

export default Operator;
