import React, {useEffect, useState} from "react";
import {Avatar} from "antd";
import "./type.d.ts"
import "./style.less"
import {UserOutlined} from "@ant-design/icons";
import SettingMenu from "@/components/settingMenu/SettingMenu";

const User:React.FC = () => {
    const [user,setUser]= useState<User>({
        id: 0,
        name: "",
        avatar: "",
        email: "",
    });

    useEffect(() => {
        // fetch user info from server
        const url = "/src/assets/image/avatar.png"; // 默认头像
        setUser({id:0,name: "zhao-gl",avatar: url,email: "zhao@gmail.com"});
    }, []);

    return (
        <div className="user">
            <div className="avatar">
                {!user.avatar && <Avatar size={50} icon={<UserOutlined />} />}
                {user.avatar && <Avatar size={50} src={<img src={user.avatar} alt="avatar" />} />}
            </div>
            <div className="user-name">
                <span>{user.name}</span>
            </div>
            <SettingMenu />
        </div>
    );
}

export default User;