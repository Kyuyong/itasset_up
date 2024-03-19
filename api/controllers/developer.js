import { db } from "../db.js";

// 개발자 등록하기 
export const registerDev = (req, res) => {

  console.log("백엔드 req.body 받은 내용: ", req.body);
  const { n_id, dev_img, introduction } = req.body;
  const q = "SELECT * FROM special.ITAsset_developer WHERE n_id = ?"

  db.query(q, [n_id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("개발자가 이미 등록 있습니다!");

    const insertQuery = `
      INSERT INTO special.ITAsset_developer
      (
        n_id,
        dev_img,
        introduction
      )
      VALUES (?,?,?)
    `;
    const values = [n_id, dev_img, introduction];
    db.query(insertQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("개발자를 등록하였습니다.");
    });
  });
};

export const getDeveloper = (req, res) => {
  const q = `
    SELECT *
    FROM special.ITAsset_developer
  `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
};


export const getUser = (req, res) => {
  const q = `SELECT * FROM special.ITAsset_users`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
};

// adminreg
// getadmin

export const AdminReg = (req, res) => {
  console.log("백엔드 req.body 받은 내용: ", req.body);
  const { n_id } = req.body;
  const q = "SELECT * FROM special.ITAsset_admin WHERE n_id = ?"


  db.query(q, [n_id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("개발자가 이미 등록 있습니다!");

    const insertQuery = `INSERT INTO special.ITAsset_admin (n_id) VALUES (?)`;
    const values = [n_id];

    db.query(insertQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Admin 계정 등록 완료");
    });
  });
};

export const getAdmin = (req, res) => {
  const q = `
  SELECT 
	  s.n_id,
    u.name,
	  u.headquarters,
	  u.team
  FROM special.ITAsset_admin s 
  LEFT JOIN special.ITAsset_users u
  ON s.n_id = u.n_id;
  `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
};
