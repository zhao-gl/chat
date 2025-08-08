import React from "react";
import {Button, message} from "antd";
import "./style.less"
import {PlusOutlined} from "@ant-design/icons";
import {createSession} from "@/api/chat/chat"
import eventBus from "@/utils/eventBus";
import {Session,CommonResponse} from "@/types";


const NewSession:React.FC = () => {

    const handleCreateSession = async () => {
        const res = await createSession() as CommonResponse<Session>
        if(res.code === 200){
            if(!res.data.msgList) res.data.msgList = []
            eventBus.emit("addSession", res.data)
        }else{
            message.warning(res.message)
        }
    }

    return (
        <div className="new-session">
            <ul>
                <li>
                    <Button style={{width: "100%"}} onClick={handleCreateSession}>
                        新会话
                        <PlusOutlined />
                    </Button>
                </li>
            </ul>
        </div>
    );
}

export default NewSession;