import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.SHARIF_MONGODB_URL as string);
    console.log("db connected successfully...");
  } catch (error: any) {
    console.error(error);
    return false;
  }
};
