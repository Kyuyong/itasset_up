import http from 'http';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const loginOpark = (username, password) => {
  return new Promise((resolve, reject) => {
    console.log(username);
    console.log(password);
    const salt = "1o1sqhmHcREdoi+137Rnug==";
    const combined = password + salt;
    const hash = crypto.createHash('sha256').update(combined).digest('base64');

    const postData = JSON.stringify({
      classId: "UserBiz",
      methodId: "doLogon",
      parameters: {
        empNo: username, // username 변수를 사용하여 동적으로 사용자 이름을 할당합니다.
        pwd: hash,
        systId: "10",
        cnntIp: "",
        deviceId: "",
        macAddr: "",
        latitd: "",
        longtd: "",
        bAutoLogin: false
      }
    });

    const options = {
      hostname: 'neosmobile.networkons.com',
      port: 80,
      path: '/RestFulAPI/ZZ/api/zznotreqauth/execute',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      // res.on('end', () => {
      //   if (res.statusCode === 200) {
      //     resolve(JSON.parse(data));
      //   } else {
      //     reject(new Error(`Request failed with status code: ${res.statusCode}`));
      //   }
      // });



      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`Full Response Data: ${data}`);
          try {
            const parsedData = JSON.parse(data);
            console.log(`Full Response Data: ${data}`);
            console.log(`Result Value: ${parsedData.result?.value}`);
            const base64Value = parsedData.result.value;
            const decodedValue = Buffer.from(base64Value, 'base64').toString('utf-8');
            console.log(`Decoded Value: ${decodedValue}`);
          } catch (error) {
            console.error('Error parsing response data:', error);
          }
        } else {
          console.error(`Request failed with status code: ${res.statusCode}`);
        }
      });



    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
};

export { loginOpark };



