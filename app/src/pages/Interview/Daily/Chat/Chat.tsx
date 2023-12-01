import React, {
  useCallback,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import { useAppMessage, useLocalParticipant } from "@daily-co/daily-react";
import { Send } from "@/components/common/svgIcons/Icons";
import styled, { css } from "styled-components";
const ChatWrapper = styled.aside`
  padding-top: 28px;
  background-color: #f5f5f5;
  width: 300px;
  height: 400px;
  position: fixed;
  bottom: 80px;
  right: 600px;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column; /* Set to column layout */
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
`;

const ChatMessages = styled.ul`
  list-style: none;
  padding: 10px;
  max-height: 300px;
  overflow-y: auto;
  flex: 1; /* Grow to fill available space */
  display: flex;
  flex-direction: column; /* Reverse order and place input at bottom */
`;
const ChatMessage = styled.li<{ isParticipant: boolean }>`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: ${({ isParticipant }) =>
    isParticipant ? "flex-end" : "flex-start"};
`;

const ChatMessageBubble = styled.div<{ isParticipant: boolean }>`
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ isParticipant }) =>
    isParticipant
      ? "#6462F1"
      : "#6462F1"}; // Set your desired bubble colors here
  color: white;
  max-width: 70%;
  word-wrap: break-word;
  margin: 5px;
`;

const ChatMessageText = styled.p`
  margin: 4px 0;
`;

const ChatMessageAuthor = styled.span<{ isParticipant: boolean }>`
  font-weight: bold;
  color: ${({ isParticipant }) => (isParticipant ? "black" : "blue")};
`;

const ChatMessageTime = styled.span`
  font-size: 12px;
  color: #999;
  margin-left: 5px;
`;

const ChatForm = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 12px;
  background-color: #fff;
  margin-right: 10px;
  outline: none;
`;

const ChatSubmitButton = styled.button`
  background-color: #6462f1;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
`;

interface Message {
  msg: string;
  name: string;
  isParticipant: boolean;
  time: string;
}

export default function Chat({
  showChat,
  toggleChat,
}: {
  showChat: boolean;
  toggleChat: () => void;
}) {
  const localParticipant = useLocalParticipant();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const sendAppMessage = useAppMessage({
    onAppMessage: useCallback(
      (ev) => {
        setMessages((existingMessages) => [
          ...existingMessages,
          {
            msg: ev.data.message,
            name: ev.data.name,
            isParticipant: ev.fromId === localParticipant?.id,
            time: new Date().toLocaleTimeString(),
          },
        ]);
      },
      [localParticipant]
    ),
  });

  const sendMessage = useCallback(
    (message: string) => {
      sendAppMessage(
        {
          message: message,
          sender: localParticipant?.user_name || "Guest",
        },
        "*"
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          msg: message,
          name: localParticipant?.user_name || "Guest",
          isParticipant: true,
          time: new Date().toLocaleTimeString(),
        },
      ]);
      return message;
    },
    [localParticipant, sendAppMessage]
  );

  useEffect(() => {
    sendAppMessage({ msg: "Hi, everyone" }, "*");
    const handleIncomingMessage = (ev) => {
      setMessages((existingMessages) => [
        ...existingMessages,
        {
          msg: ev.data.message,
          name: ev.data.name,
          isParticipant: ev.fromId === localParticipant?.id,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    };

    window.addEventListener("app-message", handleIncomingMessage);

    return () => {
      window.removeEventListener("app-message", handleIncomingMessage);
    };
  }, [sendAppMessage]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  return showChat ? (
    <ChatWrapper>
      <CloseButton onClick={toggleChat}>Close</CloseButton>
      <ChatMessages>
        {messages?.map((message, index) => (
          <ChatMessage
            key={`message-${index}`}
            isParticipant={message.isParticipant}
          >
            <ChatMessageTime>{message.time}</ChatMessageTime>
            <ChatMessageAuthor isParticipant={message.isParticipant}>
              {message.name}
            </ChatMessageAuthor>

            <ChatMessageBubble isParticipant={message.isParticipant}>
              <ChatMessageText>{message.msg}</ChatMessageText>
            </ChatMessageBubble>
          </ChatMessage>
        ))}
      </ChatMessages>
      <ChatForm onSubmit={handleSubmit}>
        <ChatInput
          type="text"
          placeholder="Type your message here..."
          value={inputValue}
          onChange={onChange}
        />
        <ChatSubmitButton type="submit">
          <Send />
        </ChatSubmitButton>
      </ChatForm>
    </ChatWrapper>
  ) : null;
}
