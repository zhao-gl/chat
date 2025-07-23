import React from "react";
import {Divider} from "antd";
import "./style.less"
import Chat from "@/pages/chat/Chat";
import Sessions from "@/pages/sessions/Sessions";
import UserCenter from "./modals/userCenter/UserCenter";
import Setting from "./modals/setting/Setting";

const Home:React.FC = () => {
    return (
        <div className="home">
            <div className="wrap">
                <Sessions></Sessions>
                <Divider type="horizontal" variant="solid" className="divider" />
                <Chat></Chat>
            </div>
            <UserCenter></UserCenter>
            <Setting></Setting>
        </div>
    );
}

export default Home;