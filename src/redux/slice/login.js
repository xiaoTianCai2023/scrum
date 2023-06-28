import { AsyncThunkAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    userinfo: {}
}


export const loginSlice = createSlice({
    name: 'login',
    initialState
})


export const {} = loginSlice.actions;


export default loginSlice.reducer


