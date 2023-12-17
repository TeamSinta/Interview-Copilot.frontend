import React, { useEffect } from "react";

const WebSocketComponent = ({ interviewRoundId, endLoader }) => {
  useEffect(() => {
    const socket = new WebSocket(
      `ws://localhost:8000/ws/transcription_consumer/${interviewRoundId}/`
    );

    // Event listener for WebSocket open
    socket.onopen = () => {
      console.log("Connected to WebSocket");
      // You can perform actions upon successful connection here
    };

    // Event listener for WebSocket messages
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message:", message);
      // Handle incoming messages from the server
      endLoader();
    };

    // Event listener for WebSocket close
    socket.onclose = (event) => {
      console.log("Disconnected from WebSocket:", event);
      // Handle WebSocket closure
    };

    // Clean up the WebSocket connection upon unmounting the component
    return () => {
      socket.close();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return <div>{/* Your component JSX */}</div>;
};

export default WebSocketComponent;
