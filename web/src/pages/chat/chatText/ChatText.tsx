import React, {useEffect, useState} from "react";
import "quill/dist/quill.snow.css";
import "./style.less"
import {addMsg, updateMsg} from "@/store/slices/roomSlice";
import {Msg, StateSlice} from "@/types";
import {message} from "antd";
import {Sender, XStream} from "@ant-design/x";
import {useDispatch, useSelector} from 'react-redux';

const ChatText: React.FC = () => {
    const [value, setValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const room = useSelector((state: StateSlice) => state.room)
    const dispatch = useDispatch();

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

            const newMsg: Msg = {
                id: resData.id,
                content: resData.content,
                time: new Date().toLocaleTimeString(),
                type: "ai",
                placement: "start",
                sender: {}
            }

            // 使用更高效的查找方式（假设room.msgMap为Map类型）
            // 如果仍使用数组，则保持原逻辑但添加安全检查
            const exist = room.msgList.find(item => item.id === newMsg.id)
            console.log("exist", exist)
            if(exist) {
                console.log("update")
                dispatch(updateMsg({id: newMsg.id, content: newMsg.content}))
            }else{
                console.log("add",room.msgList)
                dispatch(addMsg(newMsg))
            }
        }
    }

    useEffect(() => {
        console.log(room.msgList)
    }, [room.msgList]);

    const sendMsg = (v: string) => {
        const msg: Msg = {
            id: Date.now().toString(),
            content: v,
            time: new Date().toLocaleTimeString(),
            type: "self",
            placement: "end",
            sender: {
                name: "self"
            }
        }
        dispatch(addMsg(msg))
        queryQwen()
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