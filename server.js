const express = require("express");
const userRoutes = require("./router/userRouter");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors({ origin: "https://mov-dv4y.onrender.com" }));

app.use(express.json());

app.use("/api", userRoutes);

//
const connectMongoDB = async () => {
  await mongoose.connect(
    "mongodb+srv://toko:toko@cluster0.oy9ngkf.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("connected to database");
};

connectMongoDB();

//

app.listen(5000, async () => {
  console.log("listening to sever on port 5000");
});
