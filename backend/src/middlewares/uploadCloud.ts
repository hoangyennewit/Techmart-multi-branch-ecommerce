import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

// Cấu hình trực tiếp mã của bạn vào đây để đảm bảo luôn chạy
cloudinary.config({
  cloud_name: "dmr9jblyy",
  api_key: "792751818225279",
  api_secret: "CFRdRAiWsoetSZf_brO-O0Qw9bE",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "products", // Ảnh điện thoại sẽ vào thư mục 'products' trên Cloudinary
      allowed_formats: ["jpg", "png", "jpeg"],
      public_id: file.originalname.split('.')[0] + "_" + Date.now(), // Tránh trùng tên ảnh
    };
  },
});

const upload = multer({ storage });

export default upload;