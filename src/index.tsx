import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import IndexedDB from "@lib/infra/idb";
import { v4 as uuid4 } from "uuid";

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

async function initializeDB() {
  const users = [
    {
      deviceId: uuid4(),
      deviceLocation: "(40.753, -73.983)",
      time: new Date("2025-02-23 14:27:53.385729"),
    },
    {
      deviceId: uuid4(),
      deviceLocation: "(40.665, -73.940)",
      time: new Date("2025-02-23 11:43:09.987654"),
    },
    {
      deviceId: uuid4(),
      deviceLocation: "(40.735, -73.875)",
      time: new Date("2025-02-23 17:05:31.555555"),
    },
  ];

  const places = [
    {
      placeId: uuid4(),
      organizationType: "police",
      placeLocation: "(40.7549, -73.9840)",
      updatedTime: new Date("2025-02-23 14:27:53.385729"),
    },
    {
      placeId: uuid4(),
      organizationType: "fire",
      placeLocation: "(40.7549, -73.9840)",
      updatedTime: new Date("2025-02-23 14:27:53.385729"),
    },
    {
      placeId: uuid4(),
      organizationType: "hospital",
      placeLocation: "(40.7549, -73.9840)",
      updatedTime: new Date("2025-02-23 14:27:53.385729"),
    },
    {
      placeId: uuid4(),
      organizationType: "shelter",
      placeLocation: "(40.7549, -73.9840)",
      updatedTime: new Date("2025-02-23 14:27:53.385729"),
    },
  ];

  const connections = [
    { connectionId: "1", deviceId: "1" },
    { connectionId: "2", deviceId: "2" },
    { connectionId: "3", deviceId: "3" },
  ];

  const chats = [
    { connectionId: "1", sender: "1", message: "Hello" },
    { connectionId: "2", sender: "2", message: "Hi" },
    { connectionId: "3", sender: "3", message: "Hey" },
  ];

  const db = new IndexedDB();
  await db.insertOrUpdate("users", users);
  await db.insertOrUpdate("places", places);
  await db.insertOrUpdate("connections", connections);
  await db.insertOrUpdate("chats", chats);
}

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
