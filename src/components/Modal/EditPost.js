import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styles from "./EditPost.module.css";
import CarouselComponent from "../main/CarouselComponent";
import { useDispatch } from "react-redux";
import { updatePost } from "../redux/postReducer";

const EditPost = ({ postId, close }) => {
  const [post, setPost] = useState(null);
  const [inputText, setInputText] = useState("");
  const textRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (postId) {
      const getPostData = async () => {
        const res = await axios.get(
          `https://socail-app-api.vercel.app/post/${postId}`
        );
        setPost(res.data);
        setInputText(res.data.desc);
      };
      getPostData();
    }
  }, [postId]);

  const handleInput = (e) => {
    if (textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = `${e.target.scrollHeight}px`;
    }
  };

  console.log(inputText);

  const handlePostUpdate = async (images) => {
    try {
      const updateData = {
        desc: inputText,
        image: images,
      };
      const res = await axios.put(
        `https://socail-app-api.vercel.app/post/${postId}`,
        updateData
      );
      dispatch(updatePost({ postId: postId, post: res.data }));
      close();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    close();
  };

  return (
    <div className={styles.quotePost}>
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
            <p className={styles.displayName}>{post?.postedBy.fullname}</p>
            <p className={styles.username}>@{post?.postedBy.username}</p>
          </div>
        </div>
      </div>
      <div className={styles.inputArea}>
        <textarea
          ref={textRef}
          rows={1}
          placeholder="Enter text here..."
          value={inputText}
          onInput={handleInput}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />
      </div>

      {post?.image.length > 0 && (
        <div className={styles.postedImageContainer}>
          <CarouselComponent
            size={630}
            height={500}
            del={true}
            images={post?.image}
            updatePostData={handlePostUpdate}
            closeModal={handleClose}
          />
        </div>
      )}
    </div>
  );
};

export default EditPost;
