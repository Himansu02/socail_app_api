import {
  Navigate,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
import { Fragment, useEffect, useState } from "react";

const NewQuote = () => {
  // const Navigate=useNavigate();
  const error = useActionData();
  const navigation = useNavigation();
  //   const [error,setError]=useState(data);

  // const {sendRequest,status}=useHttp(addQuote);

  // useEffect(()=>{
  //     if(status==='completed')
  //     {
  //         Navigate('/quotes')
  //     }
  // },[status])

  //   const errorHandler = () => {
  //     error = { status: "", message: "" };
  //   };

  // const onAddHandler=(quoteData)=>{
  //     sendRequest(quoteData);
  // }

  return (
    <Fragment>
      {/* {error && error.status && <p className="centered">{error.message}</p>} */}
      <QuoteForm
        // func={errorHandler}
        err={error}
        submitting={navigation.state === "submitting"}
      />
    </Fragment>
  );
};

export default NewQuote;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const post = {
    author: formData.get("author"),
    text: formData.get("text"),
  };
  try {
    await addQuote(post);
  } catch (err) {
    if (err.status === 422) {
      return err;
    }
    throw err;
  }

  return redirect("/quotes");
};
