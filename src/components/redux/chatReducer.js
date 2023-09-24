import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const chatReducer = createSlice({
  name: "chat",
  initialState: {
    userMessageList: [],
    openChat: false,
    conversationId: null,
    conversationUser: null,
    onlineUsers: [],
    sharePostContent: null,
    notificationIds:[]
  },
  reducers: {
    setOpenChart: (state, action) => {

      state.conversationId = action.payload.id;
      state.openChat = action.payload.openChat;
      state.conversationUser = action.payload.conversationUser;
      
      const notification = state.notificationIds.find((n) => n.id === action.payload.id);
      
      if(notification)
      {
        notification.messages = []
      }

    },
    setCloseChat:(state,action)=>{
        state.conversationId=null
        state.openChat= false
        state.conversationUser=null
    },
    getList: (state, action) => {
      state.userMessageList = action.payload
    },
    getOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    getSharePost: (state, action) => {
      state.sharePostContent = action.payload;
    },
    getNewConversation: (state, action) => {
      console.log(action.payload)
      state.userMessageList = [action.payload, ...state.userMessageList];
    },
    reArrangeList:(state,action)=>{
      console.log(action.payload)
      const filterArray=state.userMessageList.filter((conv)=>conv._id!==action.payload.id)
      console.log(filterArray)
      const newArray=[action.payload.conversation,...filterArray]
      console.log(newArray)
      state.userMessageList=newArray
    },
    getNotificationId: (state, action) => {

      const { id, message } = action.payload;
      const notification = state.notificationIds.find((n) => n.id === id);

      if (notification) {
        notification?.messages.push(message);
      } else {
        // If the ID is not present, create a new notification object and push the message
        state.notificationIds.push({ id, messages: [message] });
      }
    },
  },
});

export const {
  setOpenChart,
  getList,
  getOnlineUsers,
  getSharePost,
  getNewConversation,
  setCloseChat,
  reArrangeList,
  getNotificationId
} = chatReducer.actions;
export default chatReducer.reducer;
