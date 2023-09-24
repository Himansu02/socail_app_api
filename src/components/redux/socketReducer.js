import { createSlice } from "@reduxjs/toolkit";

const socketReducer=createSlice({
    name:"socket",
    initialState:{
        socket:null,
    },
    reducers:{
        getCurrentSocket:(state,action)=>{
            state.socket=action.payload
        }
    }
})

export const {getCurrentSocket}=socketReducer.actions
export default socketReducer.reducer;