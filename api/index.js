import express from "express";
import solutionRoutes from "./routes/solutions.js";
import multer from "multer";


const app = express();
app.use(express.json());


////////////////////////
// FileUpload.jsx 파일 업로드 로직 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), function (req, res) {
  const filePath = req.file.path;
  // console.log(filePath);
  // res.status(200).json(file.filename);
  res.status(200).json(filePath);
});
////////////////////////


app.use("/api/solutions", solutionRoutes);

app.listen(8800, () => {
  console.log("API 8800 Port 접속완료!")
});