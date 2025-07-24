import React, {useEffect, useState} from "react";
import {StateSlice} from "@/types"
import {Welcome,Bubble } from "@ant-design/x";
import "./style.less"
import {UserOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";

const ChatWin: React.FC = () => {
    const room = useSelector((state: StateSlice) => state.room)

    const barAvatar: React.CSSProperties = {
        color: '#fff',
        backgroundColor: '#87d068',
    };

    // 滚动到聊天窗口底部
    const scrollToEnd = () => {
        const el = document.querySelector(".chat-win")
        el?.scrollTo(0, el.scrollHeight)
    }

    useEffect(() => {
        scrollToEnd()
    }, [room])
    return (
        <>
            <h3 style={{marginBottom: "10px"}}>{room.roomName}</h3>
            <div className="chat-win">
                {room.msgList.map((item): React.ReactNode => {
                    return (
                        <Bubble
                            key={item.id}
                            placement={item.placement}
                            avatar={{icon: <UserOutlined />, style: barAvatar }}
                            content={item.content}
                            style={{marginBottom: "10px"}}
                        />
                    )
                })}
            </div>
        </>
    )
}
export default ChatWin;