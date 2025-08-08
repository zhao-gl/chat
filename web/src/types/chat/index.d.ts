
export interface Session {
    id: number;
    title: string;
    msgList: Msg[];
}

export interface Msg {
    // id: number;
    content: string;
    time: string;
    type: string; // 0 普通消息 1 系统消息
    placement: "start" | "end";
    sender: UserSlice
}

