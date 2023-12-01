import Multer from "multer";
import path from "path";

const storage = Multer.memoryStorage();
const upload = Multer({
  storage: storage,
});

export default upload;

//-----To upload images but also to store the files in a custom local folder---
// const storage = Multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "src/uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
// const upload = Multer({
//   storage: storage,
// });

// export default upload;
