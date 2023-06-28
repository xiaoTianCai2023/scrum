import React from 'react'
import { List } from 'antd';
import DeleteAlert from './delete_alert'
import { useSelector } from 'react-redux';
import { select_epic_list } from '../../../redux/slice/kanban';
import { createSearchParams, Link, useLocation, useNavigate, useParams } from 'react-router-dom';



export default function EpicList() {

    const epic_list = useSelector(select_epic_list)
    // const location = useLocation()\
    const params = useParams() 
    const navigate = useNavigate()

    function handle_click(epic) {
        navigate({
            pathname: `/project/${params.id}/kanban`,
            search: createSearchParams({
                epic
            }).toString()
        })
    }

    return (
        <List
            itemLayout="horizontal"
            dataSource={epic_list}
            renderItem={(item) => (
                <List.Item style={{ height: '135px' }}>
                    <List.Item.Meta
                        title={
                            <div className='list_item_title'>
                                <div onClick={() => {
                                    handle_click(item)
                                }} style={{ fontSize: '18px', color: 'black' }}>{item}</div>
                                <DeleteAlert></DeleteAlert>
                            </div>
                            
                        }
                        description={
                            <div style={{ fontSize: '16px' }}>
                                <div>开始时间：暂无</div>
                                <div>结束时间: 暂无</div>
                            </div>
                        }
                    />
                </List.Item>
            )}
        />
    )
}
