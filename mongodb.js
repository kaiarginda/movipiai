const mongoose = require("mongoose");
// Assuming `MONGO_URI` is your MongoDB connection string
const MONGO_URI =
  "mongodb+srv://toko:toko@cluster0.oy9ngkf.mongodb.net/?retryWrites=true&w=majority";
export const connectMongoDB = async () => {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("DB connection successful!");
};
