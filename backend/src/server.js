import expess from "express";
import dotenv from "dotenv";
import { connectDB } from "./libs/db.js";


dotenv.config();

const app = expess();
const PORT = process.env.PORT || 5001;


//middlewares
app.use(expess.json()) // thay cho bodyParser giúp express đọc hiểu req body dưới dạng json

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server bắt đầu chạy trên cổng ${PORT}`);
  });
});
