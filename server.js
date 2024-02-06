import express from 'express';
import cors from "cors";
// import imgUploadRouter from "./router/imgUploadRouter.js";
import authRouter from "./router/authRouter.js";
import signupRouter from "./router/signupRouter.js";
import dotenv from 'dotenv';
dotenv.config(); 

const PORT = process.env.PORT || 8000; 
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true })); 
server.use(cors());

// server.use("/imgupload", imgUploadRouter)
server.use("/auth", authRouter);
server.use("/signup", signupRouter);
// server.use("/imgupload",express.static("imgUpload"));

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});