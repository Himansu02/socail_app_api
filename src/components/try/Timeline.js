import React, { useEffect, useState } from "react";
import QuotePost from "./QuotePost";
import styles from "./Timeline.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "./redux/postReducer";

function Timeline() {
  const [selectedSection, setSelectedSection] = useState("all");
  const dispatch = useDispatch();

  const allPosts = useSelector((state) => state.post.postArray);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("https://socail-app-api.vercel.app/post");
      dispatch(getAllPost(res.data));
    };
    getPost();
  }, []);

  const compare = (a, b) => {
    return b.like.length - a.like.length;
  };

  let filteredArray =
    selectedSection === "all"
      ? allPosts
      : (() => {
          let tempArray = [...allPosts];
          tempArray.sort(compare);
          return tempArray.filter((obj) => {
            return (
              new Date(obj.createdAt) > new Date() - 24 * 60 * 60 * 1000 &&
              obj.like.length > 0
            );
          });
        })();

  useEffect(() => {
    filteredArray =
      selectedSection === "all"
        ? allPosts
        : (() => {
            let tempArray = [...allPosts];
            tempArray.sort(compare);
            return tempArray.filter((obj) => {
              return (
                new Date(obj.createdAt) > new Date() - 24 * 60 * 60 * 1000 &&
                obj.like.length > 0
              );
            });
          })();
  }, [allPosts]);

  return (
    <div className={styles.timeline}>
      <div className={styles.title}>Home</div>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            selectedSection === "all" ? styles.activeTab : ""
          }`}
          onClick={() => setSelectedSection("all")}
        >
          ALL
        </button>
        <button
          className={`${styles.tab} ${
            selectedSection === "trending" ? styles.activeTab : ""
          }`}
          onClick={() => setSelectedSection("trending")}
        >
          TRENDING
        </button>
      </div>
      {filteredArray?.map((post, index) => (
        <QuotePost key={index} post={post} />
      ))}
      <div className={styles.lastMsgContainer}>
        <p>Refresh to get new posts.</p>
      </div>
    </div>
  );
}

export default Timeline;
