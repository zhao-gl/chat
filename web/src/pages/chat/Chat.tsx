import React from "react";
import "./chat.less"
import ChatWin from "./components/chatWin/ChatWin";
import ChatText from "./components/chatText/ChatText";

const Chat:React.FC = () => {
    return (
        <div className="chat">
            <ChatWin></ChatWin>
            <ChatText></ChatText>
        </div>
    )
}

export default Chat;