import React from "react";
import "./home.less"

import Chat from "@/pages/chat/Chat";
import Sessions from "@/pages/sessions/Sessions";
import {Divider} from "antd";

function Home() {
    return (
        <div className="home">
            <div className="wrap">
                <Sessions></Sessions>
                <Divider type="horizontal" variant="solid" className="divider" />
                <Chat></Chat>
            </div>
        </div>
    );
}

export default Home;