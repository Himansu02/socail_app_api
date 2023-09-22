import React, { useState } from 'react'
import ChatContainer from './ChatContainer'
import Conversation from './Conversation'
import styles from "./ChatBox.module.css"

const users = [
  { id: '1', name: 'User1', lastMessage: 'Hey there!', imageUrl: "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" },
  { id: '2', name: 'User2', lastMessage: 'Hello!', imageUrl: "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" },
  { id: '3', name: 'User3', lastMessage: 'Hi!', imageUrl: "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" },
  // Add more users as needed
  { id: '4', name: 'User4', lastMessage: 'How are You?', imageUrl: "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" },
];

const ChatBox = () => {

    const [openChat,setOpenChat]=useState(true);
    const [userDetail,setUserDetail]=useState(null)

    const handleClick=(data)=>{

    }

  return (
    <>
    {!openChat &&    
        <div className={styles.chatContainer}>
          <h1>Messages</h1>
          <div className={styles.userList}>
            {users.map((user)=>{
                return  (   
                <div className={styles.user} onClick={handleClick}>
                  <div className={styles.imgContainer}>
                      <img className={styles.img} src={user.imageUrl} />
                  </div>
                  <div className={styles.text}>
                      <p className={styles.name}>{user.name}</p>
                      <p className={styles.msg}>{user.lastMessage}</p>
                  </div>
                </div>
                )
            })}
          </div>
        </div>
      }
    {openChat &&<Conversation/>}
    </>
  )
}

export default ChatBox