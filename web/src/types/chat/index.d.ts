

export interface Msg {
    id: string;
    content: string;
    time: string;
    type: string; // 0 普通消息 1 系统消息
    placement: "start" | "end";
    sender: UserSlice
}