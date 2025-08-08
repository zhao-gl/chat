import React, {useEffect, useState} from "react";
import "quill/dist/quill.snow.css";
import "./style.less"
import {message} from "antd";
import {Sender, XStream} from "@ant-design/x";
import {Session, Msg} from "@/types";

interface ChatWinProps {
    session?: Session
}

const ChatText: React.FC<ChatWinProps> = (props) => {
    const {session} = props
    const [value, setValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    async function queryQwen() {
        const data = {
            type: "qwen",
            role: "user",
            content: value,
            model: "qwen-turbo"
        }
        const response = await fetch("http://localhost:3000/chat",{method: "POST", body: JSON.stringify(data)})
        for await (const chunk of XStream({
            readableStream: response.body,
        })) {
            if(chunk.event === "end") return

            // 安全解析JSON数据
            let resData;
            try {
                resData = JSON.parse(chunk.data)
            } catch (e) {
                console.error("Failed to parse chunk data:", e);
                continue;
            }

            // 验证必要字段
            if (!resData.id) {
                console.warn("Message missing id field:", resData);
                continue;
            }

            // 安全访问嵌套属性
            try {
                resData.placement = "left"
                resData.content = resData.choices[0].delta.content
            } catch (e) {
                console.error("Failed to access content from choices:", e);
                resData.content = ""; // 设置默认值
            }
            console.log("resData", resData)

            // const newMsg: Msg = {
            //     content: resData.content,
            //     time: new Date().toLocaleTimeString(),
            //     type: "ai",
            //     placement: "start",
            //     sender: {}
            // }

            // 使用更高效的查找方式（假设room.msgMap为Map类型）
            // todo 优化消息展示逻辑
            // const exist = session.msgList.find(item => item.id === newMsg.id)
            // console.log("exist", exist)
            // if(exist) {
            //     console.log("update")
                // dispatch(updateMsg({id: newMsg.id, content: newMsg.content}))
            // }else{
            //     console.log("add",session.msgList)
                // dispatch(addMsg(newMsg))
            // }
        }
    }


    const sendMsg = async (v: string) => {
        const msg: Msg = {
            content: v,
            time: new Date().toLocaleTimeString(),
            type: "self",
            placement: "end",
            sender: {
                name: "self"
            }
        }
        console.log(msg)
        // dispatch(addMsg(msg))
        await queryQwen()
    }

    useEffect(() => {

    }, [])

    return (
        <div className="chat-text">
            <Sender
                loading={loading}
                value={value}
                rootClassName={'chat-text-sender'}
                onChange={(v) => {
                    setValue(v);
                }}
                onSubmit={(v) => {
                    sendMsg(v)
                    setValue("");
                    // setLoading(true);
                }}
                onCancel={() => {
                    setLoading(false);
                    message.error('Cancel sending!');
                }}
                // onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>)=>{enter(e)}}
                autoSize={{minRows: 6, maxRows: 6}}
            />
        </div>
    )
}

export default ChatText;