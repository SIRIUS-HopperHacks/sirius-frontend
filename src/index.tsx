import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import IndexedDB from "@lib/infra/idb";

const dbConfig = {
  name: "myAppDB",
  version: 1,
  tables: [
    {
      name: "users",
      options: { keyPath: "deviceId" },
      indexes: [{ name: "deviceLocation_idx", keyPath: "deviceLocation" }],
    },
    {
      name: "places",
      options: { keyPath: "placeId" },
      indexes: [{ name: "organizationType_idx", keyPath: "organizationType" }],
    },
    {
      name: "connections",
      options: { keyPath: "connectionId" },
      indexes: [{ name: "deviceId_idx", keyPath: "deviceId" }],
    },
    {
      name: "chats",
      options: { keyPath: "connectionId" },
      indexes: [{ name: "sender_idx", keyPath: "sender" }],
    },
  ],
};

async function initializeApp() {
  try {
    await IndexedDB.initDB(dbConfig);
    console.log("IndexedDB initialized, now rendering UI...");

    const root = ReactDOM.createRoot(
      document.getElementById("root") as HTMLElement
    );
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Failed to initialize IndexedDB", err);
  }
}

initializeApp();
