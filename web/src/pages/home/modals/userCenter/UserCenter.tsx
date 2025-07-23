import React from "react"
import "./type.d.ts"
import "@/store/slices/type.d.ts"
import "./style.less"
import {Form, Input, Modal} from "antd";
import {useSelector,useDispatch } from "react-redux";
import { handleUserinfoModal } from '@/store/slices/modalSlice';

const UserCenter:React.FC = () => {
    const dispatch = useDispatch();
    const userinfoVisible = useSelector((state:stateSliceType) => state.modal.userinfoVisible);

    const handleOk = () => {
        dispatch(handleUserinfoModal(false))
    };

    const handleCancel = () => {
        dispatch(handleUserinfoModal(false))
    };

    return (
         <Modal
            title="个人中心"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={userinfoVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
             <Form>
                 <Form.Item
                     label="Name"
                     name="name"
                     rules={[
                         {
                             required: true,
                             message: 'Please input your name!',
                         },
                     ]}
                 >
                     <Input />
                 </Form.Item>
             </Form>
        </Modal>
    )
}

export default UserCenter