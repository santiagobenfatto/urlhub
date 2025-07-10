import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: '',
    userName: '',
    email: '',
    linkList: '',
    hubSetup: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser(state, action) {
            state.userName = action.payload.userName,
            state.lastName =  action.payload.lastName,
            state.nickname = action.payload.nickname
            state.email = action.payload.email
        },
        updateUserInfo(state, action) {
            state.userName = action.payload.newUserName,
            state.hubSetup = action.payload.newHubSetup
        },
        resetUser(state){
            return initialState
        }
    }

})

export const { saveUser, updateUserInfo } = userSlice.actions
export default userSlice.reducer