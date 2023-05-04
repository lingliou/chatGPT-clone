import React from "react";
import TypingEffect from "./TypingEffect.js";

const ChatContainer = (props) => {
  return (
    <div className="chatContainer">
      <div className="text-inline">
        <p className="role">User:</p> <p> {props.user}</p>
      </div>
      {props.IsLastOne ? (
        <TypingEffect text={props.assistant}></TypingEffect>
      ) : (
        <div className="text-inline">
          <p className="role">Assistant:</p> <p>{props.assistant}</p>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
