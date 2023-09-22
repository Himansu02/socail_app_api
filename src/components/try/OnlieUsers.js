import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./OnlineUsers.module.css";

const OnlieUsers = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get(
          `https://socail-app-api.vercel.app/user/${userId}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserDetails();
  }, [userId]);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src={user?.profile_img} alt="" />
      </div>
      <div className={styles.greenDotContainer}></div>
    </div>
  );
};

export default OnlieUsers;
