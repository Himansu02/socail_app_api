import React, { useEffect, useState } from "react";
import styles from "./SingleMessage.module.css";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const SingleMessage = ({ msg, timestamp }) => {
  const [post, setPost] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (msg?.postId) {
      const getPostData = async () => {
        const res = await axios.get(
          `https://socail-app-api.vercel.app/post/${msg?.postId}`
        );
        console.log(res.data);
        setPost(res.data);
      };
      getPostData();
    }
  }, [msg?.postId]);

  return (
    <div
      className={`${styles.cover} ${
        msg.sender === user.id ? styles.own : styles.away
      }`}
    >
      {msg?.text && (
        <p
          className={`${styles.mainMessage} ${
            msg.sender === user.id ? styles.receiver : styles.sender
          }`}
        >
          {msg.text}
        </p>
      )}
      {msg?.postId && (
        <Link to={`/post/${msg?.postId}`} className={styles.link}>
          <div
            className={`${styles.quotePost} ${
              msg.sender === user.id ? styles.receiver : styles.sender
            }`}
          >
            {post && (
              <>
                <div className={styles.postHeader}>
                  <div className={styles.imageContainer}>
                    <img
                      className={styles.profilePicture}
                      src={post?.postedBy.profile_img}
                      alt="User Profile"
                    />
                  </div>

                  <div className={styles.userInfo}>
                    <div className={styles.userInfoLeft}>
                      <p className={styles.displayName}>
                        {post?.postedBy.fullname}
                      </p>
                      <p className={styles.username}>
                        @{post?.postedBy.username}
                      </p>
                    </div>
                  </div>
                </div>
                <p className={styles.quoteText}>{post?.desc}</p>

                {post?.image.length > 0 && (
                  <div className={styles.postImageContainer}>
                    <img src={post?.image[0]} alt="img" />
                  </div>
                )}
              </>
            )}
            {!post && <p style={{ fontWeight: "bold" }}>Post not available</p>}
          </div>
        </Link>
      )}
      <p className={styles.time}>{timestamp}</p>
    </div>
  );
};

export default SingleMessage;
