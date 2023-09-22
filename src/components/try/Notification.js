import React, { useEffect, useState } from "react";
import styles from "./Notification.module.css";
import { Link, useParams } from "react-router-dom";
import { KeyboardBackspace } from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";
import NotificationContent from "./NotificationContent";

const Notification = () => {
  const [notificationArray, setNotificationArray] = useState([]);
  const { id } = useParams();

  const socket = useSelector((state) => state.socket.socket);

  const [selectedSection, setSelectedSection] = useState("all");

  useEffect(() => {
    const getNotification = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/notification/${id}`);
        console.log(res.data);
        setNotificationArray(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNotification();
  }, [id]);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotificationArray((prev) => {
        return [
          {
            senderId: data.senderId,
            postId: data.postId,
            type: data.type,
            text: data.text,
            commentId: data.commentId,
          },
          ...prev,
        ];
      });
    });
  }, []);

  return (
    <div className={styles.notificationContainer}>
      <div className={styles.title}>
        <Link to="/" className={styles.link}>
          <KeyboardBackspace />
        </Link>
        <h1 className={styles.sectionName}>Notifications</h1>
      </div>
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
            selectedSection === "mention" ? styles.activeTab : ""
          }`}
          onClick={() => setSelectedSection("mention")}
        >
          MENTIONED
        </button>
      </div>
      <div className={styles.notifications}>
        {notificationArray.length > 0 &&
          notificationArray.map((notification, idx) => {
            return (
              <NotificationContent key={idx} notification={notification} />
            );
          })}
      </div>
    </div>
  );
};

export default Notification;
