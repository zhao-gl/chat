import React from "react";
import "./type.d.ts"
import "@/store/slices/type.d.ts"
import "./style.less"
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import {MoreOutlined} from "@ant-design/icons";
import { useDispatch } from 'react-redux';
import { handleUserinfoModal, handleSettingModal } from '@/store/slices/modalSlice';

const SettingMenu:React.FC = () => {
    const dispatch = useDispatch();
    const items: MenuProps['items'] = [
        {
            label: "个人中心",
            key: '0',
            style: {
                width: "100px",
            },
            onClick: () => {
                dispatch(handleUserinfoModal(true))
            }
        },
        {
            label: "设置",
            key: '1',
            style: {
                width: "100px",
            },
            onClick: () => {
                dispatch(handleSettingModal(true))
            }
        },
        {
            label: "退出登录",
            key: '2',
            style: {
                width: "100px",
            },
            onClick: () => {
                console.log("退出登录")
            }
        },
    ];
    return (
        <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <MoreOutlined style={{fontSize: "30px",verticalAlign: "middle"}} />
                </Space>
            </a>
        </Dropdown>
    )
}

export default SettingMenu;