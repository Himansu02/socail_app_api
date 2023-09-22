import { useRef, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./NewCommentForm.module.css";
import { Form, useParams } from "react-router-dom";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  // const { sendRequest, status, error } = useHttp(addComment);

  // const { onAddComment } = props;

  // useEffect(() => {
  //   if (status === "completed" && !error) {
  //     onAddComment();
  //   }
  // }, [status, error]);

  // const submitFormHandler = (event) => {
  //   event.preventDefault();

  //   const enteredComment = commentTextRef.current.value;

  //   sendRequest({ commentData: {text:enteredComment}, quoteId: quoteId });
  //   commentTextRef.current.value=""

  //   // optional: Could validate here

  //   // send comment to server
  // };
 

  return (
    <Form
      className={classes.form}
      method="post"
      action=""
    >
      <div className={classes.control}>
        <label htmlFor="comment">Your Comment</label>
        <textarea
          id="comment"
          rows="5"
          ref={commentTextRef}
          name="text"
        />
      </div>
      <div className={classes.actions}>
        <button className="btn" >
          Add Comment
        </button>
      </div>
    </Form>
  );
};

export default NewCommentForm;
