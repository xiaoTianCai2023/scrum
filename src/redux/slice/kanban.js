import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    task_modal_status: {
        show: false,
        kanban_key: '',
        task_id: '',
        type: 'create'  // create || edit 
    },

    //当前的project对象
    current_project: {}
}

export const kanbanSlice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        set_task_modal: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state.task_modal_status[key] = action.payload[key];
            })
        },
        set_current_project: (state, action) => {
            state.current_project = action.payload
        }
    }
})


export const select_task_modal_status = (state) => {
    return state.kanban.task_modal_status
}

export const select_task_modal_show = (state) => {
    return state.kanban.task_modal_status.show
}

export const select_current_project = (state) => {
    return state.kanban.current_project
}

export const select_epic_list = (state) => {
    return state.kanban.current_project.epic
}

export const { set_task_modal, set_current_project } = kanbanSlice.actions;

export default kanbanSlice.reducer;



