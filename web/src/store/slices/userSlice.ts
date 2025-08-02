import { createSlice } from '@reduxjs/toolkit';
import {UserSlice} from "@/types";

// 初始状态
const initialState: UserSlice = {
    name: "zhao",
};

// 创建切片
export const userSlice = createSlice({
    name: 'user', // 切片名称，会作为 action type 的前缀
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
    },
    // 处理异步 action 或其他切片的 action
    // extraReducers: (builder) => {
    //     // 可以在这里处理异步操作的结果
    // }
});

// 导出 action 创建器
export const { setName } = userSlice.actions;

// 导出 reducer
export default userSlice.reducer;
