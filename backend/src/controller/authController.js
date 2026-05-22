import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
export const signUp = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;

    //kiểm tra input
    if (!username || !password || !email || !firstName || !lastName) {
      return res.status(400).json({ message: "Không thể thiếu username, password, email, firstName, lastName" })
    };


    // kiểm tra user tồn tại chưa
    const duplicate = await User.findOne({username});

    if(duplicate) {
      return res.status(409).json({message: "user đã tồn tại"});
    };

    // mã hóa password
    const hashPassword = await bcrypt.hash(password, 10) // salt = 10


    // tạo user mới
    await User.create({
      username,
      hashPassword,
      email,
      displayName: `${firstName} ${lastName}`
    });


    // return
    return res.sendStatus(204)
  } catch (error) {
    console.error("Lỗi khi gọi singUp", error);
    return res.status(500).json({message: "Lỗi hệ thống"})
  }
}