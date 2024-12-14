import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error, Plesase make sure MongoDB is running. " + err
      );
      process.exit(1);
    });
  } catch (error) {
    console.log("Something went wrong!!");
    console.log(error);
    process.exit(1);
  }
}
