import multer, { diskStorage } from "multer";

const storage = diskStorage({
  filename: function (req, file, calback) {
    calback(null, file.originalname);
  },
});

export const upload = multer({storage});