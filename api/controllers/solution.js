import { db } from "../db.js";

//Solution 등록하기
export const register = (req, res) => {
  const { sol_name, sol_full_name, kor_name, n_id, url, github_url, work_field, date, reg_date, imgUrl } = req.body;
  // const q = "SELECT * FROM solutiondata WHERE sol_name = ?"
  const q = "SELECT * FROM TB_itasset_solutiondata WHERE sol_name = ?"

  db.query(q, [sol_name], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Solution 과제가 이미 있습니다!");

    // const insertQuery = "INSERT INTO solutiondata (`sol_name`, `sol_full_name`, `kor_name`,`n_id`, `url`, `github_url`,`work_field`, date,`reg_date`, `img`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const insertQuery = `
    INSERT INTO TB_itasset_solutiondata 
    (
      sol_name, 
      sol_full_name, 
      kor_name, 
      n_id, 
      url, 
      github_url, 
      work_field, 
      date, 
      reg_date, 
      img
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
    const values = [
      sol_name,
      sol_full_name,
      kor_name,
      n_id,
      url,
      github_url,
      work_field,
      date,
      reg_date,
      imgUrl // 업로드된 파일의 경로를 데이터베이스에 저장
    ];

    db.query(insertQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Solution이 등록되었습니다.");
    });
  });
};


// //Solution 불러오기
export const getsolution = (req, res) => {
  const q = `
    SELECT 
      s.id AS id, 
      s.sol_name, 
      s.sol_full_name, 
      s.kor_name, 
      s.n_id, 
      u.name,
      u.team, 
      u.headquarters, 
      s.url, 
      s.github_url, 
      s.work_field, 
      s.reg_date, 
      CONCAT('/', SUBSTRING_INDEX(img, '/', -3)) AS img 
    FROM 
      special.TB_itasset_solutiondata s 
      LEFT JOIN special.users u ON s.n_id = u.n_id
  `;

  db.query(q, (req.query), (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}


//WorkFld 기준으로 불러오기
export const getWorkfld = (req, res) => {
  let q = `
    SELECT 
      s.id, 
      s.sol_name, 
      s.sol_full_name, 
      s.kor_name, 
      s.n_id, 
      u.name,
      u.team, 
      u.headquarters, 
      s.url, 
      s.github_url, 
      s.work_field,
      CONCAT('/', SUBSTRING_INDEX(img, '/', -3)) AS img 
    FROM 
      special.TB_itasset_solutiondata s 
      LEFT JOIN special.users u ON s.n_id = u.n_id
  `;
  let queryParams = [];

  if (req.query.work_field) {
    q += ` WHERE s.work_field = ?`;
    queryParams.push(req.query.work_field);
  }
  db.query(q, queryParams, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


//Product 불러오기
export const getproduct = (req, res) => {
  const q = `
    SELECT 
      s.id AS id, 
      s.sol_name, 
      s.sol_full_name, 
      s.kor_name, 
      s.n_id, 
      u.name,
      u.team, 
      u.headquarters, 
      s.url, 
      s.github_url, 
      s.work_field, 
      s.reg_date, 
      CONCAT('/', SUBSTRING_INDEX(img, '/', -3)) AS img 
    FROM 
      special.TB_itasset_solutiondata s 
      LEFT JOIN special.users u ON s.n_id = u.n_id 
    WHERE 
      s.id = ?
  `;
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}


// FileUpload.jsx 파일 업로드 로직 
export const fileupload = (req, res) => {
  const sql = 'INSERT INTO file (`file`,`date`) VALUES (?,?)';
  db.query(sql, [req.body.imgUrl, req.body.date], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving file path to database');
    }
    res.send('File uploaded and path saved to database');
  });
}