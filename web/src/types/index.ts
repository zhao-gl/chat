// export type { User, UserRole } from './api/index';
export type { ModalSlice,UserSlice,RoomSlice,StateSlice } from './store/index';
export type { Msg,Session } from './chat/index';
// export type { ButtonProps, InputProps } from './setting/index';
export type { UserType } from './user/index';

// 直接在 index.ts 中定义通用类型
export interface CommonResponse<T> {
    code: number;
    message: string;
    data: T;
}