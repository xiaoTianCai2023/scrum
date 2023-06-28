import { Modal } from 'antd';
import { Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { create_epic_async, select_epic_modal, set_ecpic_create_modal_show } from '../../redux/slice/epic';
import { get_project_async } from '../../redux/slice/project';
import axios from '../../util/http';

function CreateEpicModal() {
    const dispatch = useDispatch()
    const show = useSelector(select_epic_modal)
    const [form] = Form.useForm();
    const params = useParams()
    const project_id = params.id

    async function onOk() {
        const form_data = await form.validateFields()
        if (form_data) {
            const epic_name = form_data.epic_name;

            // 在服务端更新了数据
            const res = await axios.post(`/api/epic/${project_id}`, {
                epic_name
            });

            // 关闭弹窗
            dispatch(set_ecpic_create_modal_show(false))

            // 更新前端数据
            dispatch(get_project_async(project_id))
        }
    }

    function onCancel() {
        dispatch(set_ecpic_create_modal_show(false))
    }


    return (
        <Modal
            title="创建EPIC"
            open={show}
            okText={'创建EPIC'}
            onOk={onOk}
            onCancel={onCancel}
        >
            <Form
                name="basic"
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    label="Epic名称"
                    name="epic_name"
                    rules={[{ required: true, message: '请输入Epic名称' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateEpicModal;