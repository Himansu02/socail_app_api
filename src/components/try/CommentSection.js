import React, { useEffect } from "react";
import styles from "./CommentSection.module.css";
import { FavoriteBorder } from "@mui/icons-material";
import Comment from "./Comment";
import InfiniteScroll from "react-infinite-scroll-component";

const CommentSection = ({ comments,postId }) => {

  return (
    <div className={styles.container}>
      {comments?.map((comment, index) => {
        return (
          <Comment key={index} comment={comment} postId={postId}/>
        );
      })}
      {comments?.length === 0 && (
        <div className={styles.noCommentContainer}>
          <p>No Comments.</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
