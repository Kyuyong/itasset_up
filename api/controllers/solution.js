import { db } from "../db.js";

// // Solution 등록 로직
// export const register = (req, res) => {

//   const q = "SELECT * FROM solutiondata WHERE sol_name = ?"

//   db.query(q, [req.body.sol_name], (err, data) => {
//     if (err) return res.status(500).json(err);
//     if (data.length) return res.status(409).json("Solution 과제가 이미 있습니다!");

//     const insertQuery = "INSERT INTO solutiondata (`sol_name`, `sol_full_name`, `kor_name`,`n_id`, `url`, `github_url`,`work_field`, `date`, `likeCnt`,`img`) VALUES (?, ?, ?,?, ?, ?,?, ?, ?,?)";
//     const values = [
//       req.body.sol_name,
//       req.body.sol_full_name,
//       req.body.kor_name,
//       req.body.n_id,
//       req.body.url,
//       req.body.github_url,
//       req.body.work_field,
//       req.body.date,
//       req.body.likeCnt,
//       req.body.img
//     ];

//     db.query(insertQuery, values, (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.status(200).json("Solution이 등록되었습니다.");
//     });
//   });
// };

export const register = (req, res) => {
  const { sol_name, sol_full_name, kor_name, n_id, url, github_url, work_field, date, likeCnt, imgUrl } = req.body;
  const q = "SELECT * FROM solutiondata WHERE sol_name = ?"

  db.query(q, [sol_name], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Solution 과제가 이미 있습니다!");

    const insertQuery = "INSERT INTO solutiondata (`sol_name`, `sol_full_name`, `kor_name`,`n_id`, `url`, `github_url`,`work_field`, `date`, `likeCnt`, `img`) VALUES (?, ?, ?,?, ?, ?,?, ?, ?,?)";
    const values = [
      sol_name,
      sol_full_name,
      kor_name,
      n_id,
      url,
      github_url,
      work_field,
      date,
      likeCnt,
      imgUrl // 업로드된 파일의 경로를 데이터베이스에 저장
    ];

    db.query(insertQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Solution이 등록되었습니다.");
    });
  });
};





// FileUpload.jsx 파일 업로드 로직 
export const fileupload = (req, res) => {
  // console.log(req);
  const sql = 'INSERT INTO file (`file`,`date`) VALUES (?,?)';
  // console.log(req.body);

  db.query(sql, [req.body.imgUrl, req.body.date], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving file path to database');
    }
    res.send('File uploaded and path saved to database');
  });
}