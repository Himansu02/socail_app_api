import {
  RouterProvider,
  Route,
  Routes,
  Navigate,
  Link,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AllQuotes, { loader as quotesLoader } from "./pages/AllQuotes";
import QuoteDetails, {
  loader as singleQuoteLoader,
} from "./pages/QuoteDetails";
import NewQuote, { action as quoteAction } from "./pages/NewQuote";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";
import Comments, {
  loader as commentLoader,
  action as commentAction,
} from "./components/comments/Comments";

import "./App.css";

import HomePage from "./components/try/HomePage";

import SignUpForm from "./pages/SignUpForm";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  SignUp,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import Timeline from "./components/try/Timeline";
import Notification from "./components/try/Notification";
import Post from "./components/try/Post";
import Profile from "./components/try/Profile";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentSocket } from "./components/try/redux/socketReducer";

const clerk_publisable_key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route
        path="/"
        element={
          <>
            <SignedIn>
              <HomePage />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      >
        <Route path="/" element={<Navigate replace to="/quotes" />} />

        <Route path="/quotes" element={<Timeline />} />

        <Route path="/notifiaction/:id" element={<Notification />} />

        <Route path="/post/:postId" element={<Post />} />
        <Route path="/post/:postId/:commentId" element={<Post />} />

        <Route path="/profile/:userId" element={<Profile />} />

        <Route
          path="/quotes/:quoteId/*"
          element={<QuoteDetails></QuoteDetails>}
          loader={singleQuoteLoader}
        >
          <Route
            path=""
            element={
              <div className="centered">
                <Link className="btn--flat" to="comment">
                  Load Comments
                </Link>
              </div>
            }
          />
          <Route
            path="comment"
            element={<Comments></Comments>}
            loader={commentLoader}
            action={commentAction}
          />
        </Route>

        <Route
          path="/new-quote"
          element={<NewQuote></NewQuote>}
          action={quoteAction}
        />
        <Route path="*" element={<NotFound></NotFound>} />
      </Route>
    </>
  )
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io("https://socail-app-api.vercel.app");
    dispatch(getCurrentSocket(socket));
  }, []);

  const socket = useSelector((state) => state.socket.socket);
  console.log(socket);

  return (
    <ClerkProvider publishableKey={clerk_publisable_key}>
      <RouterProvider router={router} />
    </ClerkProvider>
  );
}

export default App;
