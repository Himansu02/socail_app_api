import React, { useEffect, useState } from "react";
import styles from "./SearchContainer.module.css";
import { Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import UserLikeModalElement from "./UserLikeModalElement";

const UserLikeModal = ({ array }) => {
  const imaginaryArray=array;
  const [filteredArray,setFilteredArray]= useState(array)



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
            console.log(ele)
          return <UserLikeModalElement id={ele} key={idx}/>
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

export default UserLikeModal;
