import React, { useState, useRef, useEffect } from "react";
import {
  StyledCommentBox,
  StyledCommentInput,
  StyledCommentList,
} from "../../Interviews/StyledNotes";
import { PencilIcon, Send } from "@/components/common/svgIcons/Icons";
import ElWrap from "@/components/layouts/elWrap/ElWrap";
import { Stack } from "@mui/material";
import { InputLabelDiv } from "@/components/pages/interview/overview_detail/StyledOverviewDetail";
import Chat from "@/components/common/form/chatBox/ChatBox";
import { IconBtnL } from "@/components/common/buttons/iconBtn/IconBtn";
import { BackgroundColor } from "@/features/utils/utilEnum";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { addNote } from "@/features/interviews/notesSlice";

type Comment = {
  timestamp: string;
  timeDelta: string;
  comment: string;
};

function Notes(props: any) {
  const { elapsedTime, reactClicked, notesEntered } = props;
  const commentInputRef = useRef<HTMLInputElement>(null);
  const comments = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const [inputText, setInputText] = useState<string>("");

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInputRef.current) {
      const commentInput = commentInputRef.current;
      const comment = commentInput.value.trim();
      if (comment) {
        const timestamp = getCurrentTime();
        const timeDelta = calculateTimeDelta(timestamp);
        // Dispatch the action to add a note to Redux with timestamp and timeDelta
        dispatch(addNote({ comment, timestamp, timeDelta }));
        commentInput.value = "";
        // Put this in API: timestamp, timeDelta, newComment
        notesEntered(comment);
      }
    }
  };

  const handleSend = () => {
    const trimmedText = inputText.trim();
    if (trimmedText !== "") {
      if (trimmedText) {
        setInputText("");
        const timestamp = getCurrentTime();
        const timeDelta = calculateTimeDelta(timestamp);
        dispatch(addNote({ comment: trimmedText, timestamp, timeDelta }));
        notesEntered(trimmedText);
        // Show the prompt when a message is sent
      }
    }
  };

  const handleReacts = (reactClicked: any = "") => {
    const comment = reactClicked?.message ?? "";
    if (comment) {
      const timestamp = getCurrentTime();
      const timeDelta = calculateTimeDelta(timestamp);
      // Dispatch the action to add a note to Redux with timestamp and timeDelta
      dispatch(addNote({ comment, timestamp, timeDelta }));
      // Put this in API: timestamp, timeDelta, newComment
      notesEntered(comment);
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

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      style={{ height: "100%" }}
    >
      <StyledCommentList>
        {comments.map((c, index) => (
          <div
            className="comment"
            key={index}
            style={{
              marginBottom: "10px",
              paddingBottom: "10px",
              border: "none",
              display: "flex",
              gap: "8px",
            }}
          >
            <span
              className="timestamp"
              style={{
                color: "#848487",
                fontWeight: "normal",
                marginBottom: "10px",
              }}
            >
              {c.timeDelta}
            </span>
            <br />
            <p
              className="commentText"
              style={{
                color: "black",
                fontWeight: "normal",
              }}
            >
              {c.comment}
            </p>
          </div>
        ))}
      </StyledCommentList>{" "}
      <StyledCommentBox style={{}} className="inputContainer">
        {/* <Chat /> */}

        <StyledCommentInput
          ref={commentInputRef}
          type="text"
          name="comment"
          placeholder="Write notes here..."
          className="commentInput"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleCommentSubmit(e);
            }
          }}
        />
        <ElWrap w={40} h={35}>
          <IconBtnL
            disable={false}
            onClick={handleSend} // Use the handleSend function
            className={BackgroundColor.ACCENT_PURPLE}
            icon={<Send />}
          />
        </ElWrap>
      </StyledCommentBox>
    </Stack>
  );
}

export default Notes;
