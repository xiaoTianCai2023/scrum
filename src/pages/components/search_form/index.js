import { Button, Input, Select, Form } from 'antd'
import axios from '../../../util/http';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { set_kanban_data } from '../../../redux/slice/drop';
import { select_users } from '../../../redux/slice/project';
import { select_epic_list } from '../../../redux/slice/kanban';
import { useEffect } from 'react';
import useSelectOptions from '../../hooks/useSelectOptios';

function SearchForm() {
    const dispatch = useDispatch()
    const [search_params] = useSearchParams()
    const [form] = Form.useForm();
    const search_epic = search_params.get('epic');
    const params = useParams()
    const epic_list = useSelector(select_epic_list) || []

    const project_id = params.id
    const { task_optiosn, users_options } = useSelectOptions()

    useEffect(() => {
        // 看有没有epic查询参数，有的话就查询数据
        if (search_epic) {
            form.setFieldValue('epic', search_epic);
        }
    }, [])

    const epic_options = epic_list.map((key) => {
        return {
            value: key,
            label: key
        }
    })

    function reset() {
        form.resetFields()
    }

    async function search(form_data) {
        const res = await axios.get(`/api/project/${project_id}`);

        let drop_data = res.data.data.kanban;
        let fliter_drop_data = drop_data.map((item) => {
            let task_list = item.task;
            task_list = task_list.filter((task) => {
                let isName = true;
                let isType = true;
                let isOwner = true;
                let isEpic = true;

                if (form_data.name) {
                    if (task.name.indexOf(form_data.name) < 0) {
                        isName = false
                    }
                }
                if (form_data.owner) {
                    if (task.owner !== form_data.owner) {
                        isOwner = false
                    }
                }
                if (form_data.type) {
                    if (task.type !== form_data.type) {
                        isType = false
                    }
                }

                if (form_data.epic) {
                    if (task.epic !== form_data.epic) {
                        isEpic = false
                    }
                }

                return isName && isType && isOwner && isEpic
            })
            return {
                ...item,
                task: task_list
            }
        })
        dispatch(set_kanban_data(fliter_drop_data))
    }

    async function search_click() {
        const form_data = await form.validateFields()
        if (form_data) {
            await search(form_data)
        }
    }

    return (
        <Form layout="inline" form={form} >
            <Form.Item
                name="name"
                style={{ width: 200 }}
            >
                <Input placeholder={'任务名'} className='search_form_input' />
            </Form.Item>
            <Form.Item
                label="负责人"
                name="owner"
                style={{ width: 200 }}
            >
                <Select
                    className='search_wrap_select'
                    options={users_options}
                >

                </Select>
            </Form.Item>
            <Form.Item
                label="任务类型"
                name="type"
                style={{ width: 200 }}
            >
                <Select
                    className='search_wrap_select'
                    options={task_optiosn}
                />
            </Form.Item>
            <Form.Item
                label="epic"
                name="epic"
                style={{ width: 200 }}
            >
                <Select
                    className='search_wrap_select'
                    options={epic_options}
                />
            </Form.Item>
            <Button onClick={reset} type="">重置</Button>
            <Button onClick={search_click} type="primary">查询</Button>
        </Form>
    )
}

export default SearchForm;