import {createSlice} from '@reduxjs/toolkit';

export const metamaskSlice = createSlice({
    name: 'metamask',
    initialState: {
        isConnected: false,
        accountData: {
            address: "",
            balance: null
        }
    },
    reducers: {
        setIsConnectedState: (state, action) => {
            state.isConnected = action.payload;
        },
        setAccountDataState: (state, action) => {
            state.accountData = action.payload;
        }
    }
})

export const { setIsConnectedState, setAccountDataState } = metamaskSlice.actions

export default metamaskSlice.reducer