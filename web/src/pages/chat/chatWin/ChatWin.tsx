import React, {useEffect, useState} from "react";
import {StateSlice} from "@/types"
import {Welcome, Bubble, XStream} from "@ant-design/x";
import "./style.less"
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";

const ChatWin: React.FC = () => {
    const room = useSelector((state: StateSlice) => state.room)
    // const dispatch = useDispatch();
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
    }, [room.msgList])
    return (
        <>
            <h3 style={{marginBottom: "10px"}}>{room.roomName}</h3>
            <div className="chat-win">
                {room.msgList.map((item): React.ReactNode => {
                    return (
                        item.placement === "start" ? (
                            <Bubble
                                key={item.id}
                                placement={"start"}
                                avatar={{icon: <UserOutlined />, style: barAvatar }}
                                content={item.content}
                                typing={true}
                                style={{marginBottom: "10px"}}
                            />
                        ) : (
                            <Bubble
                                key={item.id}
                                placement={"end"}
                                avatar={{icon: <UserOutlined />, style: barAvatar }}
                                content={item.content}
                                style={{marginBottom: "10px"}}
                            />
                        )
                    )
                })}
            </div>
            {/*<Button onClick={queryQwen}>发送</Button>*/}
        </>
    )
}
export default ChatWin;