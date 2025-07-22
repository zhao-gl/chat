import React from "react";
import "./sessions.less"

import User from "@/components/user/User"
import NewSession from "./newSession/NewSession"
import HistorySession from "./historySession/HistorySeesion"
import {Divider} from "antd";


const Sessions:React.FC = () => {
    return (
        <div className="sessions">
            <User/>
            <Divider />
            <div>
                <NewSession></NewSession>
                <Divider />
                <HistorySession></HistorySession>
            </div>
        </div>
    );
}

export default Sessions;