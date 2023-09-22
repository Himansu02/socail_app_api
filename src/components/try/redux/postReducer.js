import { createSlice } from "@reduxjs/toolkit";

const postReducer=createSlice({
    name:"post",
    initialState:{
        postArray:[]
    },
    reducers:{
        getAllPost:(state,action)=>{
            state.postArray=action.payload
        },
        addPost:(state,action)=>{
            state.postArray=[action.payload,...state.postArray]
        },
        updatePost:(state,action)=>{
            const idx = state.postArray.findIndex((post) => post._id === action.payload.postId);
            state.postArray[idx]=action.payload.post;
        },
        deletePost:(state,action)=>{
            state.postArray=state.postArray.filter((post)=>{
                return post._id!==action.payload.postId
            })
        }
    }
})

export const {getAllPost,addPost,updatePost,deletePost}=postReducer.actions
export default postReducer.reducer;