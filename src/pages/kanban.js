import SearchForm from './components/search_form'
import DropCp from './components/drop'
import { useCallback, useEffect, useMemo, useState } from 'react';
import {  useParams, useSearchParams } from 'react-router-dom';
import { kanban_selector, set_kanban_data, set_project_id } from '../redux/slice/drop';
import { useDispatch } from 'react-redux';
import { get_project_async } from '../redux/slice/project';
import CreateTaskModal from './components/create_task_modal'
import { useSelector } from 'react-redux';
import { select_current_project } from '../redux/slice/kanban';
import { Button } from 'antd';


function Kanban() {
    const dispatch = useDispatch()
    const params = useParams()
    const project_id = params.id
    const current_project = useSelector(select_current_project)

    const [search_params] = useSearchParams()
    const search_epic = search_params.get('epic');

    useEffect(() => {
        dispatch(get_project_async(project_id)).then((res) => {
            const kanban_arr = res.payload;

            if(search_epic) {
                const form_data = {
                    epic: search_epic
                }

                let fliter_drop_data = kanban_arr.map((item) => {
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
        })
        dispatch(set_project_id(project_id))
    }, [params.id])

    return (
        <div className='kanban_body'>
            <div className='Kanban_title'>
                <h1>{current_project.name}-研发看板</h1>
            </div>
            <div className='kanban_search_wrap'>
                <SearchForm />
            </div>
            {/* <DropWrap />\ */}
            <div className='drop_wrap'>
                <DropCp/>
            </div>
            <CreateTaskModal />
        </div>
    )
}

export default Kanban;