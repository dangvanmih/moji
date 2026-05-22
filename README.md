xây dựng hệ thống đăng nhập sử dụng jwt

Phase 1: setup

create folder backend và front end

1. tại folder backend:

   1. install các thư viện và khởi tạo nodemodule:
      1. npm init -y: khởi tạo nodemodule
      2. npm i express cors mongooes dotenv
      3. npm i nodemon -D
   2. khởi tạo folder src:
   3. trong src tạo các folder: controllers - routers - middleware - libs - models và file server.js
   4. khởi tạo file .gitignore
   5. khởi tạo file .env: và khai báo các Key value
   6. trong file package.json:
      1. thêm "dev": "nodemon src/server.js", "start": "node src/server.js" trong script
      2. thêm type: "module" bên dưới script
   7. trong file server.js:
      1. cấu hình app:
         ```
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

         ```
   8. trong folder libs:
      1. Tạo file db.js:
         1. khởi tạo kết nối db:
            ```
            export const connectDB = async () => {
              try {
                await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
                console.log("Liên kết CSDL thành công!");
              } catch (error) {
                console.log("Lỗi cơ sở dữ liệu",error);
                process.exit(1) //để dừng chương trình
              }
            }
            ```

    9. khởi tạo usermodel:

```
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  hashPassword: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  displayName: {
    type: String,
    require: true,
    trim: true
  },
  avatarUrl: {
    type: String // Link CDN để hiển thị hình
  },
  avatarId: {
    type: String // Cloudinary public_id để xóa hình
  },
  bio: {
    type: String,
    maxlength: 500
  },
  phone: {
    type: String,
    sparse: true, // cho phép null, nhưng ko được trùng
  },
},
  {
    timestamps: true // tự động thêm 2 trường createdAt và updatedAt
  }
);

const User = mongoose.model("User", userSchema, user)

```





10. khởi tạo file authRoute trong folder Routes:

```
import express from "express";
import { signUp } from "../controller/authController";

const router = express.router();

router.post("/signup", signUp)

export default router
```

    - sau đó gọi lại trong file server:

```
import authRoute from "./routers/authRoute.js"
//public routes
app.use('api/auth', authRoute)

//private routes
```

11. cài thêm các thư viện:
    1. jsonwebtoken: để khởi tạo và xác thực token
    2. bcrypt: mã hóa mật khẩu
    3. cookie-parser: đọc cookie từ request
