import mongoose from "mongoose";

export const connectionMongoDB = async (connectionURL) => {
  const connection = await mongoose.connect(connectionURL);
  return connection;
};
