import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: '',
    userName: '',
    email: '',
    linkList: '',
    hubSetup: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser(state, action) {
            state.userName = action.payload.userName,
            state.email = action.payload.email,
            state.linkList = action.payload.linkList, 
            state.hub = action.payload.hubSetup
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