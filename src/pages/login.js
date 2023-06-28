import React, { useEffect, useRef, useState } from 'react'
import { Menu, Form, Input, Button, Divider } from 'antd'
import LoginWrap from './components/login_wrap'
import { Link, useNavigate } from "react-router-dom"
// import axios from 'axios'
import axios from '../util/http'


// 账号登录
function LoginForm() {
  return (
    <>
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]} >
        <Input type="text" id="username" placeholder={'用户名'} />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]} >
        <Input type="password" id="password" placeholder={'密码'} />
      </Form.Item>
    </>
  )
}

// 手机验证码
function LoginPhone() {

  // const [show, setShow] = useState(true)
  // show 用来控制 验证码的显示
  const TIME_COUNT = 60
  // 默认60秒
  const [count, setCount] = useState(TIME_COUNT)
  const timerRef = useRef(null)
  // 用来记录时间的定时器

  const cutCount = () => {
    setCount((preState) => preState - 1)
  }

  const handleClick = () => {
    cutCount()
    timerRef.current = setInterval(cutCount, 1000);
  }

  useEffect(() => {
    if (count === 0) {
      clearInterval(timerRef.current)
      setCount(TIME_COUNT)
    }
  }, [count])


  // const handleClick = () => {
  //   if (!show) {
  //     // 代表开始了倒计时，那么此时点击按钮是页面不会有任何变化的，直接return出去
  //     return
  //   }
  //   console.log(count);
  //   console.log(show)

  //   const timer = setInterval(() => {
  //     if (count > 0 && count <= TIME_COUNT) {
  //       console.log(1)
  //       setShow(false)
  //       setCount(count - 1)
  //     } else {
  //       clearInterval(timer)
  //       setShow(true)
  //       setCount(TIME_COUNT)
  //     }
  //   }, 1000);

  // }

  return (
    <>
      <Form.Item name="username" rules={[{ required: true, message: '手机号码格式不正确' }]} >
        <Input type="text" id="username" placeholder={'请输入手机号'} />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入验证码' }]} >
        <div className='identifing_wrap'>
          <Input placeholder={'请输入验证码'} />
          <p className='identifing-p' onClick={count === TIME_COUNT ? handleClick : null}>
            {count === TIME_COUNT ? <span>获取验证码</span> : <span>{count + '秒后重发'}</span>}
          </p>
        </div>
      </Form.Item>
    </>
  )
}



function Login() {

  const [flag, setFlag] = useState('username');
  // 根据flag的值来切换选项卡，
  const [active, set_active] = useState('username')
  // active代表选中的选项卡,值为username代表默认选中 '账号登录'

  const [form] = Form.useForm();
  const navigate = useNavigate()

  async function login_click() {
    const form_data = await form.validateFields()
    if (form_data) {
      // console.log(form_data)
      const res = await axios.post('/api/login', form_data)

      // 登录成功
      if (res.data.code === 0) {
        navigate('/project')
      }
      // console.log('res', res)
    }
  }

  const items = [{
    label: '账号登录',
    key: 'username',
  }, {
    label: '手机验证',
    key: 'identifingcode',
  }]

  function loginToggle(e) {
    const key = e.key;
    // console.log(key)
    set_active(key)
    setFlag(key)
  }


  // function handleUserClick(e){
  //   setFlag(true)
  // }

  // function handlePhoneClick(e){
  //   setFlag(false)
  // }

  return (
    <LoginWrap >
      <Form form={form} >
        {/* <ul className='login_box_header'>
          <li className='switch' onClick={handleUserClick} >账号登录</li>
          <li className='switch' onClick={handlePhoneClick}>短信验证</li>
        </ul> */}
        <Menu
          onClick={loginToggle}
          selectedKeys={active}
          // 当前选中的选项卡
          mode={'vertical'}
          // 横向
          items={items}
        >
        </Menu>
        <p className='login_box_p'>登录界面</p>
        {flag === 'username' ? <LoginForm /> : <LoginPhone />}
        <Button onClick={login_click} className='login_button' type="primary">登录</Button>
        <Divider />
        <Link className='login_enroll' to="/register">没有账号？注册新账号</Link>
      </Form>
    </LoginWrap>
  )
}

export default Login