import { io } from "socket.io-client";

export const BACKEND_URL = "http://localhost:4000";
export const socketAction = (socket: any): void => {
  let peerConnection: RTCPeerConnection;
  const config: RTCConfiguration = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

  const videoElement: HTMLVideoElement | null = document.querySelector("video");

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
};

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
