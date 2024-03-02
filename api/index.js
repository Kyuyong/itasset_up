import express from "express";
import solutionRoutes from "./routes/solutions.js";


const app = express();
app.use(express.json());

app.use("/api/solutions", solutionRoutes);

app.listen(8800, () => {
  console.log("API 8800 Port 접속완료!")
});