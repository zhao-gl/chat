import React, {useEffect, useState} from "react";
import {StateSlice} from "@/types"
import {Welcome, Bubble, XStream} from "@ant-design/x";
import "./style.less"
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import { Button } from "antd";
import {addMsg} from "@/store/slices/roomSlice";

const ChatWin: React.FC = () => {
    const room = useSelector((state: StateSlice) => state.room)
    const dispatch = useDispatch();
    const barAvatar: React.CSSProperties = {
        color: '#fff',
        backgroundColor: '#87d068',
    };

    // 滚动到聊天窗口底部
    const scrollToEnd = () => {
        const el = document.querySelector(".chat-win")
        el?.scrollTo(0, el.scrollHeight)
    }

    async function queryQwen() {
        const data = {
            type: "qwen",
            role: "user",
            content: "你好",
            model: "qwen-turbo"
        }
        const response = await fetch("http://localhost:3000/chat",{method: "POST", body: JSON.stringify(data)})
        for await (const chunk of XStream({
            readableStream: response.body,
        })) {
            console.log(chunk);
            const data = JSON.parse(chunk.data)
            data.placement = "left"
            data.content = data.choices[0].delta.content
            dispatch(addMsg(data))
        }
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
            <Button onClick={queryQwen}>发送</Button>
        </>
    )
}
export default ChatWin;