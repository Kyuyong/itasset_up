import { db } from "../db.js";

//댓글 등록하기
export const reviewReg = (req, res) => {
  const values = { uuid, sol_id, content, date, n_id, n_name, team, headqt };
  const insertQuery = `
  INSERT INTO special.ITAsset_solutiondata
  (
    uuid,
    sol_id,
    content,
    date,
    n_id,
    n_name,
    team,
    headqt
  ) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;
  db.query(insertQuery, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("댓글이 등록되었습니다.");
  });


};