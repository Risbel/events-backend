import Multer from "multer";
import path from "path";

// const storage = Multer.memoryStorage();
// const upload = Multer({
//   storage: storage,
// });

// export default upload;

//-----To upload images but also to store the files in a custom local folder---
const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
// for delete from uploads when the upload fn was ended
const upload = Multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Assuming that file upload is successful if there's no error
    cb(null, true);
  },
});

export default upload;
