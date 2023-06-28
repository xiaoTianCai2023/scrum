import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../util/http'

const initialState = {
    modal_show: false
}

export const create_epic_async = createAsyncThunk(
    'epic/create_epic',
    async (data, state) => {
        const store = state.getState()
        const project_id = store.drop.project_id

        // console.log(data.payload)
        // const res = await axios.post(`/api/epic/${project_id}`, {
        //     epic_name: data.payload
        // });
        // return res
    }
)


export const epicSlice = createSlice({
    name: 'epic',
    initialState,
    reducers: {
        set_ecpic_create_modal_show(state, action) {
            state.modal_show = action.payload
        }
    }
})

export const select_epic_modal = (state) => {
    return state.epic.modal_show
}

export const {set_ecpic_create_modal_show} = epicSlice.actions;
export default epicSlice.reducer;




