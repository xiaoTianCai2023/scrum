import { createAsyncThunk, createSelector, createSlice, } from '@reduxjs/toolkit';

import axios from '../../util/http';
import { set_kanban_data } from './drop';
import { set_current_project } from './kanban';

const initialState = {
    list: [],
    total: 0,
    current_page: 1,
    loading: false,
    users: [],
    organizations: [],
    task_types: [],
    project_modal: {
        show: false,
        type: 'create',
        id: ''
    },
    search_query: {}
}

export const getProjectListAsync = createAsyncThunk(
    'project/get_project_list',
    async (data, store) => {
        const state = store.getState()
        const skip = (state.project.current_page - 1) * 10;
        const search_query = state.project.search_query

        const response = await axios.post('/api/projects/search', {
            ...search_query,
            skip
        });
        return response.data;
    }
)

export const getUsersAsync = createAsyncThunk(
    'project/get_users',
    async () => {
        const response = await axios.get('/api/users');
        return response.data;
    }
)

export const getOrgsAsync = createAsyncThunk(
    'project/get_orgs',
    async () => {
        const response = await axios.get('/api/organization');
        // console.log('response',response)
        return response.data;
    }
)

export const getTaskTypesAsync = createAsyncThunk(
    'project/get_task_types',
    async () => {
        const response = await axios.get('/api/task/type_list');
        return response.data;
    }
)


export const get_project_async = createAsyncThunk(
    'project/get',
    async (action, state) => {

        // 根据id获取单一的project对象
        const res = await axios.get(`/api/project/${action}`);
        const kanban = res.data.data.kanban;

        // 修改store中的数据，定义kanban的数据
        state.dispatch(set_kanban_data(kanban))
        // 设置当前的project对象
        state.dispatch(set_current_project(res.data.data))

        return kanban
    }
)

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        set_project_modal: (state, action) => {
            // state.modal_show = action.payload

            state.project_modal = {
                ...state.project_modal,
                ...action.payload
            }

        },
        change_list: (state, action) => {
            const { _id, data } = action.payload;
            const index = state.list.findIndex((item) => {
                // debugger
                // console.log(item)
                return item._id === _id
            })
            // debugger
            state.list[index] = data;
        },
        set_search_query: (state, action) => {
            state.search_query = action.payload
        },
        set_current_page: (state, action) => {
            state.current_page = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjectListAsync.pending, (state, res) => {
                state.loading = true
            })
            .addCase(getProjectListAsync.fulfilled, (state, res) => {
                // console.log('res', res) 
                const data = res.payload.data.data;
                const total = res.payload.data.total;

                data.forEach(element => {
                    if (typeof element.collect === 'undefined') {
                        element.collect = false
                    }
                });
                // debugger
                state.list = data
                // debugger
                state.loading = false
                // debugger
                state.total = total
            })
            .addCase(getOrgsAsync.fulfilled, (state, res) => {
                // console.log('res', res)
                const data = res.payload.data;
                state.organizations = data;
            })
            .addCase(getUsersAsync.fulfilled, (state, res) => {
                const data = res.payload.data;
                state.users = data;
            })
            .addCase(getTaskTypesAsync.fulfilled, (state, res) => {
                const data = res.payload.data;
                state.task_types = data;
            })
            // .addCase('drop/set_kanban_data', () => {
            //     console.log('看板设置')
            // })

    },
})
// console.log(projectSlice)
export const { set_current_page, set_project_modal, change_list, set_search_query } = projectSlice.actions;

export const select_project_modal = (state) => {
    return state.project.project_modal
}

export const select_users = (state) => {
    return state.project.users
}

export const select_orgs = (state) => {
    return state.project.organizations
}

export const select_task_types = (state) => {
    return state.project.task_types
}

export const select_project_list = (state) => {
    return state.project.list
}

export const select_project_list_loading = (state) => {
    return state.project.loading
}

export const select_project_list_data = (state) => {
    return {
        list: state.project.list,
        total: state.project.total,
        current_page: state.project.current_page
    }
}

export default projectSlice.reducer;



