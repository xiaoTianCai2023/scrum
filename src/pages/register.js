import React from 'react'
import { Form, Input, Button, Divider } from 'antd'
import LoginWrap from './components/login_wrap'
import { Link } from "react-router-dom"
import axios from '../util/http'

function Register() {

    const [form] = Form.useForm();

    async function register_click() {
        const form_data = await form.validateFields()
        if (form_data) {
            // console.log(form_data)
            axios.post('/api/register', form_data)
        }
    }

    return (
        <LoginWrap>
            <Form
                form={form}
            >
                <div className='login_box_header'>
                    <button className='switch'>请注册</button>
                </div>
                <p className='login_box_p'>账号注册</p>
                <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input type="text" id="username" placeholder={'用户名'} />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                    < Input type="password" id="password" placeholder={'密码'} />
                </Form.Item>
                <Button onClick={register_click} className='login_button' type="primary">注册</Button>
                <Divider />
                <Link className='login_enroll' to="/login">已有账号？直接登录</Link>
            </Form>
        </LoginWrap>
    )
}

export default Register