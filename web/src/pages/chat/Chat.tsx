import React, {useEffect, useState} from "react";
import "./style.less"
import {Session} from "@/types"
import ChatWin from "./chatWin/ChatWin";
import ChatText from "./chatText/ChatText";
import eventBus from "@/utils/eventBus";

const Chat:React.FC = () => {
    const [session, setSession] = useState<Session>()

    useEffect(() => {
        eventBus.on("addSession", (session: Session) => {
            console.log("session",session)
            setSession(session)
        })
    },[])
    return (
        <div className="chat">
            {session &&
                <>
                    <ChatWin session={session}></ChatWin>
                    <ChatText session={session}></ChatText>
                </>
            }
            {!session &&
                <div className="no-session">
                    点击新会话开始聊天
                </div>
            }
        </div>
    )
}

export default Chat;