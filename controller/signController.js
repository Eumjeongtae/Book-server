import * as signRepository from '../repository/signRepository.js'

import nodemailer from "nodemailer"
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

//nodemailer 모듈을 사용해 이메일 전송을 위한 SMTP 트랜스포터 생성
const transporter = nodemailer.createTransport({
    service: 'naver',
    host: 'smtp.naver.com',  // SMTP 서버명
    port: 587,  // SMTP 포트
    auth: {
        user: process.env.NAVER_ID,  // 네이버 아이디
        pass: process.env.NAVER_PASS,  // 네이버 비밀번호
    },
});

function generateRandomNumbers(min, max, count) {
    let numbers = [];

    while (numbers.length < count) {
        let n = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbers.includes(n)) {
            numbers.push(n);
        }
    }

    return numbers.join('');
}
//아이티 중복확인
export async function idCheck(req, res) {
    const id = req.body.data;
    const result = await signRepository.getUserId(id)
    result.cnt === 0 ? res.json(true) : res.json(false)
}

//이메일 체크
export async function emailCheck(req, res) {
    let { data } = req.body
    let email = data
    const result = await signRepository.getUserEmail(email)

    const randomNumbers = generateRandomNumbers(1, 9, 6);
    const mailOptions = {
        from: process.env.NAVER_ID,
        to: email,
        subject: "인증 관련 메일 입니다.",
        html: `<h1>인증번호를 입력해주세요 ${randomNumbers}</h1>`
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        // console.log("Mail Sent Response:", response);
        res.json({ ok: true, msg: '메일 전송에 성공하였습니다.', authNum: randomNumbers });
    } catch (err) {
        // console.error("Send Mail Error:", err);
        res.json({ ok: false, msg: '메일 전송에 실패하였습니다.' });
    } finally {
        transporter.close(); // 전송 종료
    }




}
//회원가입
export async function signUp(req, res) {
    let { id, name, password, email, mailAddr } = req.body.data;
     email = email + mailAddr
     password = bcrypt.hashSync(password, 10);
    const result = await signRepository.insertUser(id, password, email, name)
    if (result === 'good') {
        res.json('가입완료')
    }

    // console.log(hashPass);
}