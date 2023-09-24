import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./components/redux/store";
import "./index.css";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
