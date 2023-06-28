import React, { Profiler } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import 'antd/dist/antd.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));

// asdasd
function onRenderCallback(
    id, // 发生提交的 Profiler 树的 “id”
    phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
    actualDuration, // 本次更新 committed 花费的渲染时间
    baseDuration, // 估计不使用 memoization 的情况下渲染整棵子树需要的时间
    startTime, // 本次更新中 React 开始渲染的时间
    commitTime, // 本次更新中 React committed 的时间
    interactions // 属于本次更新的 interactions 的集合
) {
    // 合计或记录渲染时间。。。
    // console.log('app渲染', {
    //     id,
    //     phase,
    //     actualDuration,
    //     baseDuration,
    //     startTime,
    //     commitTime,
    //     interactions
    // })
}

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
            {/* <Profiler id="app" onRender={onRenderCallback}>

        </Profiler> */}
        </BrowserRouter>
    </Provider>
);