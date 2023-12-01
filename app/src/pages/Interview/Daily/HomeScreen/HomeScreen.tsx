import React from "react";
import "./HomeScreen.css";

interface HomeScreenProps {
  createCall: () => Promise<string>;
  startHairCheck: (url: string) => void;
}

export default function HomeScreen({
  createCall,
  startHairCheck,
}: HomeScreenProps) {
  const startDemo = () => {
    createCall().then((url: string) => {
      startHairCheck(url);
    });
  };

  return (
    <div className="home-screen">
      <h1>Daily React custom video application</h1>
      <p>Start the demo with a new unique room by clicking the button below.</p>
      <button onClick={startDemo} type="button">
        Click to start a call
      </button>
      <p className="small">
        Select “Allow” to use your camera and mic for this call if prompted
      </p>
    </div>
  );
}
