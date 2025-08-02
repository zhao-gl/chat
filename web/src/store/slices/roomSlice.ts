import { createSlice } from '@reduxjs/toolkit';
import {RoomSlice} from "@/types";

// 初始状态
const initialState: RoomSlice = {
    roomId: "0",
    roomName: "room0",
    roomType: "single",
    msgList: []
};

// 创建切片
export const roomSlice = createSlice({
    name: 'room', // 切片名称，会作为 action type 的前缀
    initialState,
    reducers: {
        setRoomName: (state, action) => {
            state.roomName = action.payload;
        },
        addMsg: (state, action) => {
            state.msgList.push(action.payload);
        },
        updateMsg: (state, action) => {
            const msg = state.msgList.find(item => item.id === action.payload.id)
            msg.content += action.payload.content;
        }
    },
    // 处理异步 action 或其他切片的 action
    // extraReducers: (builder) => {
    //     // 可以在这里处理异步操作的结果
    // }
});

// 导出 action 创建器
export const { setRoomName, addMsg,updateMsg } = roomSlice.actions;

// 导出 reducer
export default roomSlice.reducer;
