import React from "react";
import "./style.less"
import {DeleteOutlined, EditOutlined, StopOutlined} from '@ant-design/icons';
import {Conversations} from '@ant-design/x';
import type {ConversationsProps} from '@ant-design/x';
import {type GetProp, message, theme} from 'antd';

const items: GetProp<ConversationsProps, 'items'> = Array.from({length: 20}).map((_, index) => ({
    key: `item${index + 1}`,
    label: `Conversation Item ${index + 1}`,
}));

const HistorySession: React.FC = () => {
    const { token } = theme.useToken();
    const style = {
        width: "100%",
        background: "#fafafa",
        borderRadius: token.borderRadius,
    };
    const menuConfig: ConversationsProps['menu'] = (conversation) => ({
        items: [
            {
                label: '打开会话',
                key: '0',
                icon: <EditOutlined/>,
            },
            {
                label: '删除会话',
                key: '1',
                icon: <DeleteOutlined/>,
                danger: true,
            },
        ],
        onClick: (menuInfo) => {
            menuInfo.domEvent.stopPropagation();
            message.info(`Click ${conversation.key} - ${menuInfo.key}`);
        },
    });

    return (
        <>
            <div className={"history"}>
                <Conversations defaultActiveKey="item1" menu={menuConfig} items={items} style={style}/>
            </div>
        </>
    );
}

export default HistorySession;