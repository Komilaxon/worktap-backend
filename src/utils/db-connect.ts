import mongoose from "mongoose";
const SHARIF_URL = "mongodb+srv://fullstackdeveloper4413:yv4UCb8yhWtrbOFp@mydb.svis6ii.mongodb.net/komila?retryWrites=true&w=majority"
export const dbConnection = async () => {
  try {
    await mongoose.connect(SHARIF_URL);
    console.log("db connected successfully...");
  } catch (error: any) {
    console.error(error);
    return false;
  }
};
