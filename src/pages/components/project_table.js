
import { Button, Space, Table } from 'antd';
import dayjs from 'dayjs';
import { shallowEqual, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { change_list, getProjectListAsync, select_project_list, select_project_list_data, select_project_list_loading, select_users, set_current_page, set_project_modal } from '../../redux/slice/project';
import { store } from '../../redux/store'
import axios from '../../util/http'
import { Pagination } from 'antd';
import { useDispatch } from 'react-redux';

function hand_collect_click(record) {
    const data = {
        ...record,
        collect: !record.collect
    }

    const dispatch = store.dispatch;
    dispatch(change_list({
        _id: record._id,
        data
    }))
    // 跟服务器同步
    axios.put(`/api/projects/${record._id}`, {
        collect: data.collect
    })
}

function edit_click(id) {
    store.dispatch(set_project_modal({
        show: true,
        type: 'edit',
        id
    }))
}

async function del_click(id) {
    await axios.delete(`/api/projects/${id}`);
    store.dispatch(getProjectListAsync())
}

const columns = [
    {
        title: '收藏',
        dataIndex: 'collect',
        key: 'collect',
        render: (text, record) => {
            return (
                <div onClick={() => {
                    hand_collect_click(record)
                }} className='iconfont icon-shoucang shoucang-item' style={{ color: text ? '#dfd50c' : '' }}></div>
            )
        },
        width: '10%'
    },
    {
        title: '项目名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, data) => {
            // console.log(text, data)
            return <NavLink to={`/project/${data._id}/kanban`}>{text}</NavLink>
        },
        sorter: (a, b) => a.title - b.title,
        width: '30%',
    },
    {
        title: '部门',
        dataIndex: 'organization',
        key: 'organization',
        width: '15%'
    },
    {
        title: '负责人',
        dataIndex: 'owner',
        key: 'owner',
        render: text => <div>{text}</div>,
        width: '15%'
    },
    {
        title: '创建时间',
        key: 'created',
        dataIndex: 'created',
        render: (_, record) => (
            <Space size="middle">
                <div>{dayjs(record.created).format('DD/MM/YYYY')}</div>
            </Space>
        ),
    },
    {
        title: '操作',
        key: 'created',
        dataIndex: 'created',
        render: (_, record) => (
            <>
                <Button type='primary' onClick={() => {
                    edit_click(record._id)
                }}>编辑</Button>
                <Button type='danger' onClick={() => {
                    del_click(record._id)
                }}>删除</Button>

            </>
        ),
    },
];



function ProjectTable() {
    const dispatch = useDispatch()

    console.log('项目列表 render')

    // 性能优化点
    let data = useSelector(select_project_list_data, shallowEqual)

    const loading = useSelector(select_project_list_loading)
    console.log(loading)
    // 应该render几次？
    // 2 
    // redux发起action的时候会发布
    // useSelector订阅redux中的数据
    // 每次发布之后，useSelector都会执行，然后和上一次的数据进行===对比，如果不一致就更新
    // let data = useSelector(select_project_list_data)

    // console.log('data', data)
    function onChange(page) {
        dispatch(set_current_page(page));
        dispatch(getProjectListAsync())
    }

    return (
        <>  
            <Table rowKey="created" className='project_table_css' loading={loading} pagination={false} dataSource={data.list} columns={columns} />
            <Pagination
                onChange={onChange}
                total={data.total}
                current={data.current_page}
            />
        </>
    )
    // return <></>
}

export default ProjectTable