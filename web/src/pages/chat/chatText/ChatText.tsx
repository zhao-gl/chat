import React, {useEffect, useState} from "react";
import "quill/dist/quill.snow.css";
import "./style.less"
import {addMsg} from "@/store/slices/roomSlice";
import {Msg} from "@/types";
import {message} from "antd";
import {Sender} from "@ant-design/x";
import {useDispatch} from 'react-redux';

const ChatText: React.FC = () => {
    const [value, setValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const sendMsg = (v: string) => {
        const msg: Msg = {
            id: Date.now(),
            content: v,
            time: new Date().toLocaleTimeString(),
            type: "self",
            placement: "end",
            sender: {
                name: "self"
            }
        }
        dispatch(addMsg(msg))
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