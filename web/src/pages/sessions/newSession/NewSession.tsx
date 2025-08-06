import React from "react";
import {Button} from "antd";
import "./style.less"
import {PlusOutlined} from "@ant-design/icons";
import {createSession} from "@/api/chat/chat"


const NewSession:React.FC = () => {
    return (
        <div className="new-session">
            <ul>
                <li>
                    <Button style={{width: "100%"}} onClick={() => createSession({})}>
                        新会话
                        <PlusOutlined />
                    </Button>
                </li>
            </ul>
        </div>
    );
}

export default NewSession;