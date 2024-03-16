import cors from 'cors';
import express from "express";
import solutionRoutes from "./routes/solutions.js";
import reviewRoutes from "./routes/reviews.js";
import multer from "multer";
import { loginOpark } from './opark.js';
import cookieParser from "cookie-parser";



const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:3000', 'https://itasset.skons.co.kr']
}));

////////////////////////
// 이미지 파일 업로드 로직 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload/solutions");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });
// app.post("/api/upload", upload.single("file"), function (req, res) {
//   const filePath = req.file.path;
//   res.status(200).json(filePath);
// });

app.post("/api/upload", upload.single("file"), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "파일이 업로드되지 않았습니다. 파일을 첨부해주세요." });
  }
  console.log("업로드된 파일 정보:", req.file);
  try {
    // 파일이 성공적으로 업로드되었을 경우의 로직
    const filePath = req.file.path;
    const fileName = req.file.filename; // 저장된 파일 이름
    console.log("file path: ", filePath);
    console.log("file name: ", fileName);
    // filePath를 포함하는 응답을 클라이언트로 보냄
    res.status(200).json({ filePath });
  } catch (error) {
    // 기타 서버 내부 오류 처리
    console.error("파일 업로드 중 오류 발생:", error);
    res.status(500).json({ message: "파일 업로드 처리 중 서버에서 오류가 발생했습니다." });
  }
});
////////////////////////


////////////////////////
// Opark 로그인 로직
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const loginResult = await loginOpark(username, password);
    // 여기서 loginResult의 success와 userDetails를 확인합니다.
    if (loginResult.success && loginResult.authUserValue === 'Y') {
      res.status(200).json({ success: true, message: '로그인 성공', data: loginResult });
    } else {
      res.status(401).json({ success: false, message: '로그인 인증 실패' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: '로그인 실패', error: error.message });
  }
});
////////////////////////

app.use("/api/solutions", solutionRoutes);
app.use("/api/reviews", reviewRoutes);


app.listen(8800, () => {
  console.log("API 8800 Port 접속완료!")
});

app.get('/api/someEndpoint', (req, res) => {
  res.send("someEndpoint의 응답입니다!!");
});



