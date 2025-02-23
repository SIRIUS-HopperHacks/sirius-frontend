import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import IndexedDB from "@lib/infra/idb";
import { v4 as uuid4 } from "uuid";

const dbConfig = {
  name: "sirius",
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
      name: "chatrooms",
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
    {
      deviceId: uuid4(),
      deviceLocation: "(40.745, -73.825)",
      time: new Date("2025-02-23 17:05:31.532555"),
    },
  ];

  const places = [
    {
      placeId: uuid4(),
      name: "Central Police Station",
      distance: "1.2 miles",
      phone: "+1-202-555-0114",
      organizationType: "police",
      location: "200 W Main St, Smithtown, NY 11787",
      placeLocation: "(40.7549, -73.9840)",
      updatedTime: new Date("2025-02-23 14:27:53.385729"),
    },
    {
      placeId: uuid4(),
      name: "Northside Fire Department",
      distance: "0.9 miles",
      phone: "+1-303-555-0198",
      organizationType: "fire",
      location: "150 E Pine St, Oakwood, CA 90210",
      placeLocation: "(34.0522, -118.2437)",
      updatedTime: new Date("2025-02-23 14:30:00.000000"),
    },
    {
      placeId: uuid4(),
      name: "Downtown General Hospital",
      distance: "2.3 miles",
      phone: "+1-212-555-0176",
      organizationType: "hospital",
      location: "300 N Broadway, New York, NY 10007",
      placeLocation: "(40.7128, -74.0060)",
      updatedTime: new Date("2025-02-23 14:32:45.123456"),
    },
    {
      placeId: uuid4(),
      name: "Sunrise Community Shelter",
      distance: "3.0 miles",
      phone: "+1-415-555-0132",
      organizationType: "shelter",
      location: "45 Sunset Blvd, San Francisco, CA 94105",
      placeLocation: "(37.7749, -122.4194)",
      updatedTime: new Date("2025-02-23 14:35:12.654321"),
    },
    {
      placeId: uuid4(),
      name: "Eastside Medical Center",
      distance: "1.8 miles",
      phone: "+1-617-555-0123",
      organizationType: "hospital",
      location: "22 Beacon St, Boston, MA 02108",
      placeLocation: "(42.3601, -71.0589)",
      updatedTime: new Date("2025-02-23 14:40:22.987654"),
    },
    {
      placeId: uuid4(),
      name: "West End Fire Station",
      distance: "2.5 miles",
      phone: "+1-305-555-0184",
      organizationType: "fire",
      location: "77 Ocean Dr, Miami, FL 33139",
      placeLocation: "(25.7617, -80.1918)",
      updatedTime: new Date("2025-02-23 14:42:33.000000"),
    },
  ];
  
  const chatrooms = [
    { connectionId: uuid4(), deviceId1: users[0], deviceId2: users[1] },
    { connectionId: uuid4(), deviceId1: users[0], deviceId2: users[2] },
    { connectionId: uuid4(), deviceId1: users[0], deviceId2: users[3] },
  ];

  const db = new IndexedDB();
  for (const user of users) {
    await db.insertOrUpdate("users", user);
  }

  for (const place of places) {
    await db.insertOrUpdate("places", place);
  }

  for (const connection of chatrooms) {
    await db.insertOrUpdate("chatrooms", connection);
  }
}

async function initializeApp() {
  try {
    await IndexedDB.initDB(dbConfig);
    await initializeDB();
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
