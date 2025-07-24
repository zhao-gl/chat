import { createSlice } from '@reduxjs/toolkit';
import {ModalSlice} from "@/types";

// 初始状态
const initialState: ModalSlice = {
    userinfoVisible: false,
    settingVisible: false,
};

// 创建切片
export const modalSlice = createSlice({
    name: 'modal', // 切片名称，会作为 action type 的前缀
    initialState,
    reducers: {
        // 同步 reducer
        handleUserinfoModal: (state,action  ) => {
            // Redux Toolkit 内部使用 Immer 库，允许"直接修改"状态
            if(typeof action.payload !== 'boolean'){
                throw new Error('handleUserinfoModal action payload must be a boolean!');
            }
            state.userinfoVisible = action.payload;
            console.log("userinfoVisible:",state.userinfoVisible)
        },
        handleSettingModal: (state,action) => {
            if(typeof action.payload !== 'boolean'){
                throw new Error('handleSettingModal action payload must be a boolean!');
            }
            state.settingVisible = action.payload;
            console.log("settingVisible:",state.settingVisible)
        },

    },
    // 处理异步 action 或其他切片的 action
    // extraReducers: (builder) => {
    //     // 可以在这里处理异步操作的结果
    // }
});

// 导出 action 创建器
export const { handleUserinfoModal, handleSettingModal } = modalSlice.actions;

// 导出 reducer
export default modalSlice.reducer;
