import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    // const uniquePrefix = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export { upload };
