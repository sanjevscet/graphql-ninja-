import chalk from "chalk";
import mongoose from "mongoose";

export const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {});

  console.log(chalk.green(`MongoDB connected, ${conn.connection.host}`));
};
