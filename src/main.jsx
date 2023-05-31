import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.jsx";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        theme={{
          colors: {
            primary: [
              "#F8F0FC",
              "#F3D9FA",
              "#EEBEFA",
              "#E599F7",
              "#DA77F2",
              "#CC5DE8",
              "#BE4BDB",
              "#AE3EC9",
              "#9C36B5",
              "#862E9C",
            ],
          },
          primaryColor: "primary",
        }}
      >
        <UserProvider>
          <App />
        </UserProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
