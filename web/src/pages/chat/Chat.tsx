import React from "react";
import "./style.less"
import ChatWin from "./chatWin/ChatWin";
import ChatText from "./chatText/ChatText";

const Chat:React.FC = () => {
    return (
        <div className="chat">
            <ChatWin></ChatWin>
            <ChatText></ChatText>
        </div>
    )
}

export default Chat;