import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./UserLikeModalElement.module.css";
import axios from "axios";

const UserLikeModalElement = ({ id }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`http://localhost:5000/user/${id}`);
      setUser(res.data);
    };
    getUser();
  }, [id]);

  return (
    <Link className={styles.link} to={`/profile/${user?.externalId}`}>
      <div className={styles.postHeader}>
        <div className={styles.imageContainer}>
          <img
            className={styles.profilePicture}
            src={user?.profile_img}
            alt="User Profile"
          />
        </div>
        <div className={styles.userInfo}>
          <p className={styles.displayName}>{user?.fullname}</p>
          <p className={styles.username}>{"@" + user?.username}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserLikeModalElement;
