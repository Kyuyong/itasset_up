import { db } from "../db.js";


export const register = (req, res) => {

  const q = "SELECT * FROM solutiondata WHERE sol_name = ?"

  db.query(q, [req.body.sol_name], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Solution 과제가 이미 있습니다!");

    const insertQuery = "INSERT INTO solutiondata (`sol_name`, `kor_name`, `n_id`) VALUES (?, ?, ?)";
    const values = [
      req.body.sol_name,
      req.body.kor_name,
      req.body.n_id,
    ];

    db.query(insertQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Solution이 등록되었습니다.");
    });

  });

};