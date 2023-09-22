import { Fragment, useRef, useState } from "react";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";
import { Form } from "react-router-dom";

const QuoteForm = ({ err, submitting }) => {
  // const authorInputRef = useRef();
  // const textInputRef = useRef();

  // function submitFormHandler(event) {
  //   event.preventDefault();

  //   const enteredAuthor = authorInputRef.current.value;
  //   const enteredText = textInputRef.current.value;

  //   // optional: Could validate here

  //   props.onAddQuote({ author: enteredAuthor, text: enteredText });
  // }
  // console.log(err);
  const [v, setV] = useState(true);

  const fun = () => {
    if (!submitting) {
      setV(true);
    }
  };

  return (
    <Fragment>
      {v && err && err.status && <p className="centered">{err.message}</p>}
      <Card>
        <Form
          className={classes.form}
          method="post"
          action="/new-quote"
          onSubmit={() => setV(true)}
        >
          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              onFocus={() => {
                setV(false);
                err.status = null;
              }}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" name="text"></textarea>
          </div>
          <div className={classes.actions}>
            <button className="btn" disabled={submitting}>
              {submitting ? "submitting..." : "Add Quote"}
            </button>
          </div>
        </Form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
