import mongoose, { ConnectOptions } from "mongoose";
import config from "../config";

export default async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("MongoDB Loaded");
  } catch (error: any) {
    console.log(`MongoDB Error :- ${error.message}`);
  }
};
