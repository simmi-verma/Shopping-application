import mongoose from "mongoose";

export default async function connect() {
  if (!process.env.MONGO_URI) {
    console.log("No MONGO_URI defined. Using JSON database fallback.");
    return;
  }
  try {
    mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
    });
  } catch (err) {
    console.log("Something went wrong with MongoDB connection!");
    console.log(err);
  }
}
