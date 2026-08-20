import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#111111",
          color: "#fff",
          border: "1px solid rgba(212,175,55,.2)",
        },
      }}
    />
    <App />
  </BrowserRouter>
);