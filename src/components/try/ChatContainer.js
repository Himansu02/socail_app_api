// import React from 'react';
// import UserList from './UserList';
// import Conversation from './Conversation';

// const ChatContainer=()=> {
//   return (
//     <div className={styles.chatContainer}>
//       <UserList />
//       <Conversation />
//     </div>
//   );
// }

// export default ChatContainer;
import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import styles from "./ChatContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { getList, getOnlineUsers } from "./redux/chatReducer";
import OnlieUsers from "./OnlieUsers";
import { Search } from "@mui/icons-material";

const ChatContainer = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const [friendUsersOnline, setFriendUsersOnline] = useState([]);
  const conversations = useSelector((state) => state.chat.userMessageList);
  const socket = useSelector((state) => state.socket.socket);
  const onlineUsers = useSelector((state) => state.chat.onlineUsers);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    if (conversations.length === 0) {
      const getConversationList = async () => {
        const res = await axios.get(
          `http://localhost:5000/conversation/${user.id}`
        );
        dispatch(getList(res.data));
      };
      getConversationList();
    }
  }, []);

  useEffect(() => {
    socket.on("getOnlineUsers", (data) => {
      // console.log(data)
      dispatch(getOnlineUsers(data));
    });
  }, []);

  useEffect(() => {
    const userIdsArray1 = [].concat(...conversations.map((obj) => obj.members));

    // Use filter to find objects in array1 with common userId values
    const commonObjects = onlineUsers.filter(
      (obj2) => userIdsArray1.includes(obj2.userId) && obj2.userId !== user.id
    );

    // console.log(commonObjects);

    setFriendUsersOnline(commonObjects);
  }, [conversations, onlineUsers]);

  const handleChange = (e) => {
    setSearchName(e.target.value);
  };

  return (
    <>
      <div className={styles.chatContainer}>
        <h1 className={styles.heading}>Messages</h1>
        <div className={styles.inputContainer}>
          <input placeholder="Search" onChange={handleChange} />
          <Search fontSize="large" />
        </div>
        {friendUsersOnline.length > 0 && (
          <div className={styles.onlineUserContainer}>
            {friendUsersOnline.map((user) => {
              // console.log(user);
              return <OnlieUsers key={user.userId} userId={user.userId} />;
            })}
          </div>
        )}
        {conversations.length>0 && <UserList searchName={searchName} />}
      </div>
    </>
  );
};

export default ChatContainer;
