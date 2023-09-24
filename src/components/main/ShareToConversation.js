import React, { useState } from "react";
import styles from "./ShareToConversation.module.css";
import { Search } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import User from "./User";
import SharedConversation from "../Modal/SharedConversation";

const ShareToConversation = ({postId}) => {
  const conversations = useSelector((state) => state.chat.userMessageList);
  const [filteredList, setFilteredList] = useState([...conversations]);

  const { user } = useUser();

  const handleChange = (e) => {};

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <Search fontSize="large" />
        <input placeholder="Search" onChange={handleChange} />
      </div>
      <div className={styles.resultContainer}>
        {filteredList.map((conversation, idx) => {
          const conversationUserId =
            conversation.members[0] === user.id
              ? conversation.members[1]
              : conversation.members[0];
          return (
            <SharedConversation
              key={idx}
              conversationUserId={conversationUserId}
              id={conversation._id}
              postId={postId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ShareToConversation;
