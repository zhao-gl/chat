import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/modalSlice';
import userReducer from './slices/userSlice';

// 配置并导出 store
export const store = configureStore({
    reducer: {
        // 这里定义各个切片对应的 reducer
        modal: modalReducer,
        user: userReducer
    }
});
