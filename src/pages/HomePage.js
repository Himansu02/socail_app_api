import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  Home,
  Explore,
  Notifications,
  MailOutline,
  TurnedIn,
  List,
  Person,
  Add,
  Search,
} from "@mui/icons-material";
import styles from "./HomePage.module.css";
import Timeline from "../components/try/Timeline";
import { Outlet, Link } from "react-router-dom";

import ChatBox from "../components/try/ChatBox";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@mui/material";
import NewPost from "../components/try/NewPost";
import { UserButton, useUser, useAuth } from "@clerk/clerk-react";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import axios from "axios";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { app, auth } from "../Firebase";
import SearchContainer from "../components/try/SearchContainer";
import { getCurrentUser } from "../components/try/redux/userReducer";
const ChatContainer = lazy(() => import("../components/try/ChatContainer"));

const Conversation = lazy(() => import("../components/try/Conversation"));

const HomePage = () => {
  const { user } = useUser();
  const openChat = useSelector((state) => state.chat.openChat);
  const [openPost, setOpenPost] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const socket = useSelector((state) => state.socket.socket);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://socail-app-api.vercel.app/user/${user.id}`
      );
      dispatch(getCurrentUser(res.data));
    };
    fetchUser();
  }, []);

  useEffect(() => {
    socket.emit("newUser", user.id);
  }, []);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setCount((prev) => {
        return prev + 1;
      });
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
    setOpenPost(false);
    setOpenSearch(false);
  };

  const handleOpenPost = () => {
    setOpen(true);
    setOpenPost(true);
  };

  const handleOpenSearch = () => {
    setOpen(true);
    setOpenSearch(true);
  };

  const handleNotificationClick = () => {
    setCount(0);
  };

  const navigationLinks = [
    {
      icon: (
        <Link to="/">
          <Home className={styles.icon} fontSize="large" />
        </Link>
      ),
      name: "Home",
    },
    {
      icon: (
        <Link to={`/notifiaction/${user.id}`}>
          <div
            className={styles.notificationContainer}
            onClick={handleNotificationClick}
          >
            <Notifications className={styles.icon} fontSize="large" />
            {count > 0 && (
              <div className={styles.count}>
                <span>{count}</span>
              </div>
            )}
          </div>
        </Link>
      ),
      name: "Notifications",
    },
    {
      icon: (
        <Link to={`/profile/${user.id}`}>
          <Person className={styles.icon} fontSize="large" />
        </Link>
      ),
      name: "Profile",
    },
    {
      icon: (
        <Search
          className={styles.icon}
          fontSize="large"
          onClick={handleOpenSearch}
        />
      ),
      name: "Search",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <div className={styles.userButtonContainer}>
          <UserButton />
          <span className={styles.fullName}>{user.fullName}</span>
        </div>
        {navigationLinks.map((link, index) => (
          <div className={styles.menuItem} key={index}>
            <span>{link.icon}</span>
            <span className={styles.linkName}>{link.name}</span>
          </div>
        ))}
        <button
          type="button"
          className={styles.button}
          onClick={handleOpenPost}
        >
          Post
        </button>
      </div>
      <Modal
        onClose={handleClose}
        open={open}
        style={{
          position: "absolute",
          boxShadow: "2px solid black",
          height: 700,
          width: 650,
          left: "30%",
          top: "5%",
          overflow: "auto",
        }}
      >
        <div className={styles.modalContainer}>
          {openPost && <NewPost closeModal={handleClose} />}
          {openSearch && <SearchContainer clickHandler={handleClose} />}
        </div>
      </Modal>
      <div className={styles.content}>
        <Outlet />
      </div>
      <div className={styles.chatArea}>
        <Suspense fallback={<h1>Loading........</h1>}>
          {!openChat && <ChatContainer />}
          {openChat && <Conversation />}
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
