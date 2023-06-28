import './App.css';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import Register from './pages/register'
import Layout from './pages/components/layout'
import Project from './pages/project'
import Kanban from './pages/kanban'
import Epic from './pages/epic'
import Login from './pages/login'
import EventBus from './util/event'
import { notification } from 'antd';

// var antd = require('antd')
import { useEffect } from 'react';
import { getOrgsAsync, getProjectListAsync, getTaskTypesAsync, getUsersAsync } from './redux/slice/project';
import { useDispatch } from 'react-redux';
import 'antd/dist/antd.css'

// import { mergeWith } from 'lodash-es/mergeWith'
// const notification = antd.notification
function App() {
    console.log('app render')

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    // 全局通知
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (msg) => {
        api.error({
            message: msg,
            placement: 'topRight'
        });
    };
    
    useEffect(() => {
        if(location.pathname === '/') {
            navigate('/project')
        }
        // 获取下拉框动态数据
        dispatch(getUsersAsync())
        dispatch(getOrgsAsync())
        dispatch(getTaskTypesAsync())

        // 拉取项目列表
        dispatch(getProjectListAsync())

        // 没有登录
        EventBus.on("global_not_login", function (msg) {
            navigate('/login')
        })

        EventBus.on("global_error_tips", function (msg) {
            // console.log('发生错误了')
            openNotification(msg)
        })
    }, [])

    // 注意顶层的组件render次数
    // app
    // project 
    // kanban
    // ProjectTable
    // DropCp
    return ( 
        <div className="App">
            {contextHolder}
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/project' element={<Project />}></Route>
                    <Route path='/project/:id/kanban' element={<Kanban />}></Route>
                    <Route path='/project/:id/epic' element={<Epic />}></Route>
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;