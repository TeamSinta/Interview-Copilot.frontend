import ElWrap from '@/components/layouts/elWrap/ElWrap';
import React, {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
} from 'react';
import {
  ChatContainer,
  ChatInput,
  ChatMessages,
  Textarea,
} from './StyledChatBot';
import { IconBtnL } from '../../buttons/iconBtn/IconBtn';
import { BackgroundColor } from '@/features/utils/utilEnum';
import { SendMessageIcon } from '../../svgIcons/Icons';
import { useDispatch } from 'react-redux';
import { addNote } from '@/features/interviews/notesSlice';

const Chat = (props: any) => {
  const { elapsedTime, notesEntered, activeQuestionID } = props;
  const [lastMessage, setLastMessage] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const [, setShowPrompt] = useState<boolean>(false);
  const [messages, setMessages] = useState<
    { text: string; timestamp: string; editing: boolean }[]
  >([]);

  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;

    // Show the prompt when input is not empty
    setShowPrompt(event.target.value.trim() !== '');
  };

  const handleSend = () => {
    const trimmedText = inputText.trim();
    if (trimmedText !== '') {
      const timestamp = getCurrentTime();
      const message = { text: trimmedText, timestamp, editing: false }; // Create a message object including text and timestamp
      setMessages([...messages, message]); // Add the message to the messages state
      // setMessages([...messages, { text: trimmedText, editing: false }]);
      setInputText('');
      setLastMessage(trimmedText);
      setShowPrompt(true);
      const timeDelta = calculateTimeDelta(timestamp);
      dispatch(addNote({ comment: trimmedText, timestamp, timeDelta }));
      notesEntered(trimmedText, activeQuestionID);
      // Show the prompt when a message is sent
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      const trimmedText = inputText.trim();
      if (trimmedText !== '') {
        setMessages([...messages, { text: trimmedText, editing: false }]);
        setInputText('');
        setLastMessage(trimmedText);
        setShowPrompt(true);
        const timestamp = getCurrentTime();
        const timeDelta = calculateTimeDelta(timestamp);
        dispatch(addNote({ comment: trimmedText, timestamp, timeDelta }));
        notesEntered(trimmedText, activeQuestionID);
        // Show the prompt when a message is sent
      }
    }
  };

  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const calculateTimeDelta = (timestamp: string): string => {
    const initialTime = convertToSeconds(elapsedTime);
    const currentTime = convertToSeconds(timestamp);
    const delta = currentTime - initialTime;
    return formatTime(delta);
  };

  const convertToSeconds = (timeString: string): number => {
    const [hours, minutes, seconds] = timeString.split(':');
    return +hours * 3600 + +minutes * 60 + +seconds;
  };
  function formatTime(time: any) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  useEffect(() => {
    // Scroll to the bottom of the chat container after rendering new messages
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="w-full flex flex-col relative bg-white h-2/3 px-4">
      {messages.length > 0 && (
        <>
          <ChatMessages ref={chatMessagesRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className="text-sm p-1 flex flex-cols justify-end items-center gap-3"
              >
                <div className="text-xs text-gray-400">{getCurrentTime()}</div>
                <div
                  className="rounded-xl p-2 max-w-xs whitespace-pre-wrap break-words border-gray-300"
                  style={{ border: '2px solid lightgray' }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </ChatMessages>
          <div className="text-end text-xs p-2 text-gray-400">
            To see all your notes, see the "Notes" tab.
          </div>
        </>
      )}

      <ChatInput>
        <div className="flex flex-row w-full">
          <Textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="Add comments here..."
            onKeyDown={handleKeyDown}
            rows={1}
          />
        </div>
        <ElWrap w={50} h={50}>
          <IconBtnL
            disable={false}
            onClick={handleSend} // Use the handleSend function
            className={BackgroundColor.ACCENT_PURPLE}
            icon={<SendMessageIcon />}
          />
        </ElWrap>
      </ChatInput>
    </div>
  );
};

export default Chat;
