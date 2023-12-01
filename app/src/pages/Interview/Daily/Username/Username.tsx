import React from "react";
import "./Username.css";
import { useParticipantProperty } from "@daily-co/daily-react";
import { BodyLMedium } from "@/components/common/typeScale/StyledTypeScale";

interface UsernameProps {
  id: string;
  isLocal: boolean;
}

export default function Username({ id, isLocal }: UsernameProps) {
  const username = useParticipantProperty(id, "user_name");

  return (
    <div className="username">
      <BodyLMedium>
        {username || id} {isLocal && "(You)"}
      </BodyLMedium>
    </div>
  );
}
