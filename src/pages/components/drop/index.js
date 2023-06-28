import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import TaskDrop from './task_drop';
import '../../css/drop.css'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { add_kanban, kanban_order, kanban_selector, task_diff_order, task_same_order, update_kanban_async } from '../../../redux/slice/drop';
import { Button, Input } from 'antd';
import React, { useEffect, useState, useTransition } from 'react';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { set_task_modal } from '../../../redux/slice/kanban';


function reorderList(list, startIndex, endIndex) {
    const result = Array.from(list);
    // debugger
    const [removed] = result.splice(startIndex, 1);
    // debugger
    result.splice(endIndex, 0, removed);
    // debugger
    return result;
}

function DropCp(props) {
    const dispatch = useDispatch();
    const drag_data = useSelector(kanban_selector)
    // const drag_data = props.drag_data;
    // const [drag_data, set_drag_data] = useState([])
    // 降低渲染优先级，开启并发更新 fiber task拆分
    // const [isPending, startTransition] = useTransition()

    // 开启假设性原则
    // useEffect(() => {
    //     let data = []
    //     for (let i = 0; i < 100; i++) {
    //         let task = []

    //         for (let j = 0; j < 30; j++) {
    //             task.push({
    //                 name: `${i}_${j}`,

    //                 owner: `${i}_${j}`,
    //                 type: 'bug'
    //             })
    //         }
    //         data.push({
    //             kanban_key: `${i}`,
    //             task
    //         })
    //     }
    //     set_drag_data(data)
    // }, [])

    console.log('看板 drop render')

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        if (result.type === 'kanban') {
            dispatch(kanban_order({
                source: result.source.index,
                destination: result.destination.index,
            }))
            // 更新看板
            dispatch(update_kanban_async())
        }

        if (result.type === 'task') {
            if (result.source.droppableId === result.destination.droppableId) {

                dispatch(task_same_order({
                    kanban_key: result.destination.droppableId,
                    source: result.source.index,
                    destination: result.destination.index,
                }))

                // 更新看板
                dispatch(update_kanban_async())
            } else {
                dispatch(task_diff_order({
                    source_kanban_key: result.source.droppableId,
                    destination_kanban_key: result.destination.droppableId,
                    source: result.source.index,
                    destination: result.destination.index,
                }))
                // 更新看板
                dispatch(update_kanban_async())
            }
        }
    }

    function input_keydown(e) {
        const value = e.target.value.trim();
        if (!value) {
            return;
        }
        dispatch(add_kanban({
            kanban_key: value
        }))
        dispatch(update_kanban_async())
    }

    function new_task_click(kanban_key) {
        dispatch(set_task_modal({
            show: true,
            kanban_key,
            type: 'create'
        }))
    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
            className="drag_container"
        >
            <Droppable direction="horizontal" droppableId="droppable-kanban" type="kanban">
                {(provided, snapshot) => (
                    <div
                        className='kanban_drop_wrap'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {drag_data.map((item, index) => {
                            return (
                                <Draggable key={item.kanban_key} draggableId={item.kanban_key} index={index}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                className='kanban_drag_wrap'
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}

                                            >
                                                <h1>{item.kanban_key}</h1>
                                                <TaskDrop task={item} />
                                                <Button className='new_task_btn' onClick={() => {
                                                    new_task_click(item.kanban_key)
                                                }} type="primary" ghost>
                                                    新建task
                                                </Button>
                                            </div>
                                        )
                                    }}
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <div className='kanban_drag_wrap'>
                <Input onPressEnter={input_keydown} placeholder="新建看板名称" />
            </div>
        </DragDropContext>
    )
}


const DropCpMemo = React.memo(DropCp)
export default DropCpMemo;