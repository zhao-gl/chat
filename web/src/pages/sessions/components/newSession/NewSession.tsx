import React from "react";
import {Button} from "antd";
import "./style.less"


const NewSession:React.FC = () => {
    return (
        <div className="new-session">
            <ul>
                <li>
                    <Button>新会话</Button>
                </li>
            </ul>
        </div>
    );
}

export default NewSession;