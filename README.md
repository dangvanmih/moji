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
         1. import các thư viện
            1. : import express from "express";
            2. import dotenv from "dotenv";
         2. gọi biến dotenv: dotenv.config()
         3. khởi tạo app: const app = express();
         4. khai báo PORT: const PORT = process.env.PORT || 5001
         5. viết các middelwares:
            1. app.use(express.json) : thay cho bodyParser giúp express đọc hiểu req body dưới dạng json
         6. hiển thị thông báo chạy thành công:
            1. app.use (PORT, () => { console.log(`Server bắt đầu chạy trên cổng` ${PORT}) })
