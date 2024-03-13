import express from "express";
import solutionRoutes from "./routes/solutions.js";
import multer from "multer";
import { loginOpark } from './opark.js';
import cookieParser from "cookie-parser";


const app = express();
app.use(express.json());
app.use(cookieParser())

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
app.post("/api/upload", upload.single("file"), function (req, res) {
  const filePath = req.file.path;
  // console.log(filePath);
  // res.status(200).json(file.filename);
  res.status(200).json(filePath);
});
////////////////////////


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const loginResult = await loginOpark(username, password);

    // console.log(`loginresult;`, loginResult)
    // 여기서 loginResult의 success와 userDetails를 확인합니다.
    if (loginResult.success && loginResult.authUserValue === 'Y') {
      // 두 조건이 모두 만족하는 경우에 로그인 성공으로 처리합니다.
      res.status(200).json({ success: true, message: '로그인 성공', data: loginResult });
    } else {
      // 하나라도 만족하지 않는 경우에 로그인 실패로 처리합니다.
      res.status(401).json({ success: false, message: '로그인 인증 실패' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: '로그인 실패', error: error.message });
  }
});


app.use("/api/solutions", solutionRoutes);


app.listen(8800, () => {
  console.log("API 8800 Port 접속완료!")
});