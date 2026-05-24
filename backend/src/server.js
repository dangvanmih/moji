import expess from "express";
import dotenv from "dotenv";
import { connectDB } from "./libs/db.js";
import authRoute from "./routers/authRoute.js"
import userRoute from "./routers/userRoute.js"
import cookieParser from 'cookie-parser';
import { protectRoute } from "./middlewares/authMiddleware.js";
dotenv.config();

const app = expess();
const PORT = process.env.PORT || 5001;


//middlewares
app.use(expess.json()) // thay cho bodyParser giúp express đọc hiểu req body dưới dạng json
app.use(cookieParser())


//public routes
app.use('/api/auth', authRoute)

//private routes
app.use(protectRoute)
app.use('/api/users', userRoute)


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server bắt đầu chạy trên cổng ${PORT}`);
  });
});
