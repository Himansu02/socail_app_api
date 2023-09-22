import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import { Fragment, useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import { useLoaderData } from "react-router-dom";


const AllQuotes = () => {
  // const {
  //   sendRequest,
  //   status,
  //   data: loadedData,
  //   error,
  // } = useHttp(getAllQuotes, true);

  // useEffect(() => {
  //   sendRequest();
  // }, [sendRequest]);

  // if (status === "pending") {
  //   return (
  //     <div className="centered">
  //       <LoadingSpinner></LoadingSpinner>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return <p className="centered focused">{error}</p>;
  // }

  // if (status === "completed" && (!loadedData || loadedData.length === 0)) {
  //   return <NoQuotesFound></NoQuotesFound>;
  // }

  const loadedData=useLoaderData();

  return (
    <Fragment>
      <QuoteList quotes={loadedData}>
        
      </QuoteList>
    </Fragment>
  );
};

export default AllQuotes;

export const loader=()=>{
  return getAllQuotes();
}
