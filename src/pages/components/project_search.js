import { Input, Select, Form, Button } from 'antd'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getProjectListAsync, select_orgs, select_users, set_current_page, set_search_query } from '../../redux/slice/project';
import useSelectOptions from '../hooks/useSelectOptios';

function ProjectSearch() {

    const dispatch = useDispatch()

    const { orgs_options, users_options } = useSelectOptions(); 

    const [form] = Form.useForm();


    async function search_click() {
        const form_data = await form.validateFields()
        if (form_data) {
            dispatch(set_search_query(form_data))
            dispatch(set_current_page(1))
            dispatch(getProjectListAsync())
        }
    }

    function reset() {
        form.resetFields()
    }



    return (
        <Form layout="inline" form={form} >
            <Form.Item
                name="name"
                style={{ width: 180 }}
            >
                <Input placeholder={'任务名'} />
            </Form.Item>
            <Form.Item
                label="部门"
                name="organization"

                style={{ width: 180 }}
            >
                <Select
                    options={orgs_options}
                >
                </Select>
            </Form.Item>
            <Form.Item
                label="负责人"
                name="owner"
                style={{ width: 180 }}
            >
                <Select
                    options={users_options}
                >
                </Select>
            </Form.Item>
            <Button onClick={reset} type="">重置</Button>
            <Button onClick={search_click} type="primary">查询</Button>
        </Form>
    )
}

export default ProjectSearch