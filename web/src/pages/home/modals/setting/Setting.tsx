import React from "react"
import "./type.d.ts"
import "@/store/slices/type.d.ts"
import "./style.less"
import {Form, Input, Modal} from "antd";
import {useSelector,useDispatch } from "react-redux";
import { handleSettingModal } from '@/store/slices/modalSlice';
import { saveSetting } from "@/api/setting/index"

const Setting:React.FC = () => {
    const dispatch = useDispatch();
    const settingVisible = useSelector((state:stateSliceType) => state.modal.settingVisible);
    const closeSettingModal = () => {
        dispatch(handleSettingModal(false))
    }
    const handleOk = () => {
        // saveSetting()
        closeSettingModal()
    };

    const handleCancel = () => {
        closeSettingModal()
    };

    return (
         <Modal
            title="设置"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={settingVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form>
                <Form.Item
                    label="API"
                    name="api"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your api!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="密钥"
                    name="secret"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your secret!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Setting