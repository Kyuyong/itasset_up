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
      CONCAT('/', SUBSTRING_INDEX(img, '/', -3)) AS img,
      s.version,
      s.reupdate, 
      s.likeCnt
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
  // console.log("getproduct : ", req.params.id)
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
      CONCAT('/', SUBSTRING_INDEX(img, '/', -3)) AS img,
      s.version,
      s.reupdate
    FROM 
      special.ITAsset_solutiondata s 
      LEFT JOIN special.ITAsset_users u ON s.n_id = u.n_id 
    WHERE 
      s.id = ?
  `;
  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      return res.status(500).json(err)
    }

    // console.log("getproduct data : ", data);
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

// Solutions - 부가 내용 수정하기 
export const updateSoletc = (req, res) => {
  console.log("solution 부가내용수정 req.body : ", req.body);
  const postId = req.params.id;
  const q = `
  UPDATE special.ITAsset_solutiondata
  SET 
    sol_name = ?,
    sol_full_name = ?,
    kor_name = ?,
    work_field = ?,
    url = ? ,
    github_url = ?,
    version = ?,
    reupdate = ?,
    reg_date = ?
  WHERE 
    id = ?
  `;
  const values = [
    req.body.sol_name, req.body.sol_full_name, req.body.kor_name, req.body.work_field,
    req.body.url, req.body.github_url,
    req.body.version, req.body.reupdate, req.body.reg_date, postId];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Solution 부가내용을 업데이트 하였습니다.");
  })
}

// 좋아요 수 가져오기 
export const getLikes = (req, res) => {
  const id = req.params.id;
  const q = "SELECT likeCnt FROM special.ITAsset_solutiondata WHERE id = ?";
  db.query(q, [id], (err, result) => {
    if (err) {
      console.error("좋아요 수 조회 중 오류 발생: ", err);
      return res.status(500).json({ error: "서버 오류" });
    }
    // 조회 성공
    if (result.length > 0) {
      res.json({ likeCnt: result[0].likeCnt });
    } else {
      res.status(404).json({ message: "Solution을 찾을 수 없습니다." });
    }
  });
};


// 좋아요 업데이트 하기 
export const likes = (req, res) => {
  // console.log("likes 들어온 req.params", req.params);
  // console.log("likes 들어온 req.body", req.body);
  const id = req.params.id;
  const likeCnt = req.body.likeCount;
  // console.log("likeCnt 값은? ", likeCnt);

  const q = "UPDATE special.ITAsset_solutiondata SET  likeCnt = ? WHERE  id =? ";
  db.query(q, [likeCnt, id], (err, result) => {
    if (err) {
      console.error("쿼리 실행 에러:", err);
      return res.status(500).json({ error: err.message });
    }
    return res.json({ message: "좋아요 수 업데이트 성공", likeCnt });
  });
}

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