import {
  Route,
  useParams,
  Link,
  useRouteMatch,
  Outlet,
  useLoaderData,
} from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetails = () => {
  const loadedQuote = useLoaderData();

  // const {sendRequest,status,data: loadedQuote,error}=useHttp(getSingleQuote,true);

  // // const match=useRouteMatch();
  // const params = useParams();

  // // console.log(match);

  // const {quoteId}=params;

  // useEffect(()=>{
  //   sendRequest(quoteId)
  // },[sendRequest,quoteId])

  // if(status==='pending')
  // {
  //   return <div className="centered"><LoadingSpinner></LoadingSpinner></div>
  // }

  // if(error)
  // {
  //     return <p className="centered focused">{error}</p>
  // }

  if (!loadedQuote.text) {
    return <p className="centered">No Quote Found!</p>;
  }

  return (
    <section>
      <HighlightedQuote
        text={loadedQuote.text}
        author={loadedQuote.author}
      ></HighlightedQuote>
      <Outlet></Outlet>
    </section>
  );
};

export default QuoteDetails;

export const loader = ({ params }) => {
  const quoteId = params.quoteId;
  return getSingleQuote(quoteId);
};
