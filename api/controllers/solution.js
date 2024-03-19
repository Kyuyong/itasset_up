import { db } from "../db.js";

//Solution 등록하기
export const register = (req, res) => {
  const { sol_name, sol_full_name, kor_name, n_id, url, github_url, work_field, date, reg_date, imgUrl } = req.body;
  const q = "SELECT * FROM special.ITAsset_solutiondata WHERE sol_name = ?"
  // const q = "SELECT * FROM TB_itasset_solutiondata WHERE sol_name = ?"

  db.query(q, [sol_name], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Solution 과제가 이미 있습니다!");

    // const insertQuery = "INSERT INTO solutiondata (`sol_name`, `sol_full_name`, `kor_name`,`n_id`, `url`, `github_url`,`work_field`, date,`reg_date`, `img`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const insertQuery = `
    INSERT INTO special.ITAsset_solutiondata
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
      imgUrl.filePath //imgUrl.filePath 단독으로 저장할때는 이걸로 써야함
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
      special.ITAsset_solutiondata s 
      LEFT JOIN special.ITAsset_users u ON s.n_id = u.n_id
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
      special.ITAsset_solutiondata s 
      LEFT JOIN special.ITAsset_users u ON s.n_id = u.n_id
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
      s.direc,
      s.target,
      s.effect,
      CONCAT('/', SUBSTRING_INDEX(img, '/', -3)) AS img 
    FROM 
      special.ITAsset_solutiondata s 
      LEFT JOIN special.ITAsset_users u ON s.n_id = u.n_id 
    WHERE 
      s.id = ?
  `;
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}



// Solutions - Update 세부내역 입력하기
export const updateSolDesc = (req, res) => {
  const postId = req.params.id;
  const q = `
    UPDATE special.ITAsset_solutiondata
    SET 
      direc = ?,
      target = ?,
      effect = ?
    WHERE 
      id = ?`;
  const values = [req.body.direc, req.body.target, req.body.effect, postId];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Solution을 업데이트 하였습니다.");
  });
};




// FileUpload.jsx 파일 업로드 로직  [req.body.imgUrl, req.body.date]
export const fileupload = (req, res) => {
  // const sql = 'INSERT INTO special.ITAsset_filetest (`file`,`date`) VALUES (?,?)';
  const { filePath, date } = req.body;
  console.log("DB로 응답받은 내용: ", req.body)
  const sql = "INSERT INTO special.ITAsset_filetest (`file`,`date`) VALUES (?,?)";
  db.query(sql, [filePath, date], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving file path to database');
    }
    res.send('File uploaded and path saved to database');
  });
}