export interface ModalSlice {
    userinfoVisible: boolean;
    settingVisible: boolean;
}

export interface UserSlice {
    name: string;
}

export interface RoomSlice {
    roomId: string;
    roomName: string;
    roomType: string;
    msgList: Msg[];
}

export interface StateSlice {
    modal: ModalSlice
    user: UserSlice
    room: RoomSlice
}