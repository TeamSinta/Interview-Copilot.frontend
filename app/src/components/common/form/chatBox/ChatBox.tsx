import ElWrap from "@/components/layouts/elWrap/ElWrap";
import React, {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
} from "react";
import {
  ChatContainer,
  ChatInput,
  ChatMessages,
  Textarea,
} from "./StyledChatBot";
import { IconBtnL } from "../../buttons/iconBtn/IconBtn";
import { BackgroundColor } from "@/features/utils/utilEnum";
import {
  LeftArrowIcon,
  PencilIcon,
  PlayIcon,
  Send,
} from "../../svgIcons/Icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { addNote } from "@/features/interviews/notesSlice";

const Chat = (props: any) => {
  const { elapsedTime, reactClicked, notesEntered, activeQuestionID } = props;
  const [lastMessage, setLastMessage] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const comments = useSelector((state: RootState) => state.notes.notes);
  const commentInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch(); // Get the dispatch function from Redux

  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [messages, setMessages] = useState<
    { text: string; editing: boolean }[]
  >([]);

  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;

    // Show the prompt when input is not empty
    setShowPrompt(event.target.value.trim() !== "");
  };

  const handleSend = () => {
    const trimmedText = inputText.trim();
    if (trimmedText !== "") {
      setMessages([...messages, { text: trimmedText, editing: false }]);
      setInputText("");
      setLastMessage(trimmedText);
      setShowPrompt(true);
      const timestamp = getCurrentTime();
      const timeDelta = calculateTimeDelta(timestamp);
      dispatch(addNote({ comment: trimmedText, timestamp, timeDelta }));
      notesEntered(trimmedText);
      // Show the prompt when a message is sent
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      const trimmedText = inputText.trim();
      if (trimmedText !== "") {
        setMessages([...messages, { text: trimmedText, editing: false }]);
        setInputText("");
        setLastMessage(trimmedText);
        setShowPrompt(true);
        const timestamp = getCurrentTime();
        const timeDelta = calculateTimeDelta(timestamp);
        dispatch(addNote({ comment: trimmedText, timestamp, timeDelta }));
        notesEntered(trimmedText);
        // Show the prompt when a message is sent
      }
    }
  };

  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const calculateTimeDelta = (timestamp: string): string => {
    const initialTime = convertToSeconds(elapsedTime);
    const currentTime = convertToSeconds(timestamp);
    const delta = currentTime - initialTime;
    return formatTime(delta);
  };

  const convertToSeconds = (timeString: string): number => {
    const [hours, minutes, seconds] = timeString.split(":");
    return +hours * 3600 + +minutes * 60 + +seconds;
  };
  function formatTime(time: any) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  useEffect(() => {
    // Scroll to the bottom of the chat container after rendering new messages
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatContainer>
      <ChatInput>
        <ElWrap w={32}>
          <PencilIcon />
        </ElWrap>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="Add comments here..."
            onKeyDown={handleKeyDown}
            rows={1}
          />
        </div>
        <ElWrap w={40} h={35}>
          <IconBtnL
            disable={false}
            onClick={handleSend} // Use the handleSend function
            className={BackgroundColor.ACCENT_PURPLE}
            icon={<Send />}
          />
        </ElWrap>
      </ChatInput>
      {messages.length > 0 && (
        <>
          <div style={{ textAlign: "center", padding: "8px", color: "gray" }}>
            To see all your notes, see the "Notes" tab.
          </div>
          <ChatMessages ref={chatMessagesRef}>
            <div style={{ whiteSpace: "pre-wrap" }}>{lastMessage}</div>
          </ChatMessages>
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;
