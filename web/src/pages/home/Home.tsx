import React from "react";
import "./home.less"

import Chat from "@/pages/chat/Chat";
import Sessions from "@/pages/sessions/Sessions";

function Home() {
    return (
        <div className="home">
            <div className="wrap">
                <Sessions></Sessions>
                <Chat></Chat>
            </div>
        </div>
    );
}

export default Home;