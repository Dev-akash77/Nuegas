import mongoose from "mongoose";

export const DataBaseConnect = async () => {
  try {
    // ! mojngo db connection using Mongoose
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connetcted succesfully");
  } catch (error) {
    console.log("Database Connection Error", error);
  }
};
