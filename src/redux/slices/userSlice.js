import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: null,
        userUuid: null,
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setUserUuid: (state, action) => {
            state.userUuid = action.payload;
        }
    }
})

export const { setUsername, setUserUuid } = userSlice.actions

export default userSlice.reducer