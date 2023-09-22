import React, { useEffect, useState } from "react";
import styles from "./SearchContainer.module.css";
import { Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchContainer = ({ clickHandler }) => {
  const [imaginaryArray, setImaginaryArray] = useState([]);
  const [filteredArray,setFilteredArray]= useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/user");
        console.log(res);

        setImaginaryArray(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  const handleChange=(e)=>{
    if(e.target.value.trim().length===0)
    {
      setFilteredArray([])
      return;
    }
    setFilteredArray(()=>{
      return imaginaryArray.filter((user)=>{
        return user.username.startsWith(e.target.value)
      })
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <Search fontSize="large" />
        <input placeholder="Search" onChange={handleChange}/>
      </div>
      <div className={styles.resultContainer}>
        {filteredArray.map((ele, idx) => {
          return (
            <Link
              className={styles.link}
              to={`/profile/${ele.externalId}`}
              onClick={() => {
                clickHandler();
              }}
              key={idx}
            >
              <div className={styles.postHeader}>
                <div className={styles.imageContainer}>
                  <img
                    className={styles.profilePicture}
                    src={ele.profile_img}
                    alt="User Profile"
                  />
                </div>
                <div className={styles.userInfo}>
                  <p className={styles.displayName}>{ele.fullname}</p>
                  <p className={styles.username}>{'@'+ele.username}</p>
                </div>
              </div>
            </Link>
          );
        })}
        {filteredArray.length===0 &&(
          <div className={styles.noResultContainer}>
            <p>No Search Results.</p>
          </div> 
        )}
      </div>
      
    </div>
  );
};

export default SearchContainer;
