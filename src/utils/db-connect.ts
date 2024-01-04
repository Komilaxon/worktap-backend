import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb+srv://komilafayziyeva94:pJWG8RMAG7zsXEZK@claster.f0rfpqp.mongodb.net/exam');
    console.log("db connected successfully...");
  } catch (error: any) {
    console.error(error);
    return false;
  }
};
