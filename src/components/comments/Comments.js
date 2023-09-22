import { useCallback, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import { redirect, useLoaderData, useParams } from "react-router-dom";
import { getAllComments, addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = () => {
  
  const [isAddingComment, setIsAddingComment] = useState(false);
  // const params=useParams();
  // const {sendRequest,status,data:loadedComments,error}=useHttp(getAllComments,true)

  // const {quoteId}=params;

  // useEffect(()=>{
  //   sendRequest(quoteId)
  // },[sendRequest,quoteId])
  const loadedComments = useLoaderData();

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  
 

  // const addCommentHandler=useCallback(()=>{
  //   sendRequest(quoteId)
  // },[sendRequest,quoteId]);

  

  let comments;

  // if(status==='pending')
  // {
  //   comments=<div className='centered'><LoadingSpinner></LoadingSpinner></div>
  // }

  if (loadedComments || loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments}></CommentsList>;
  }

  if (!loadedComments || loadedComments.length === 0) {
    comments = <p className="centered">No Comments Found</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && <button className="btn" onClick={startAddCommentHandler}>
        Add a Comment
      </button>}
      {isAddingComment && <NewCommentForm />}
      {comments}
    </section>
  );
};

export default Comments;

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const quoteId = params.quoteId;
  console.log(formData.get("text"));
  const post = {
    commentData: { text: formData.get("text") },
    quoteId: quoteId,
  };
  await addComment(post);
  return redirect('')
};

export const loader = ({ params }) => {
  const quoteId = params.quoteId;
  return getAllComments(quoteId);
};
