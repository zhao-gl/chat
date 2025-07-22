import React from "react";
import {Welcome} from "@ant-design/x";
import "./chatWin.less"

const ChatWin:React.FC = () => {
    return (
        <div className="chat-win">
            <Welcome
                icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
                title="Hello, I'm Ant Design X"
                description="Base on Ant Design, AGI product interface solution, create a better intelligent vision~"
            />
        </div>
    )
}
export default ChatWin;