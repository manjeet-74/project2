import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false; // Track connection status

export async function connect() {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI!);
    isConnected = db.connections[0].readyState === 1; // 1 = connected

    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running: " + err
      );
      process.exit(1);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
