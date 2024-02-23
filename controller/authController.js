import axios from "axios";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import * as signRepository from '../repository/signRepository.js'
import * as loginRepository from '../repository/loginRepository.js'

dotenv.config();


const getUserDate = async (authTokenUrl, data, accessTokenUrl) => {
    const authToken = await axios.post(authTokenUrl, data,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }
    );

    const accessToken = authToken.data.access_token; // 액세스 토큰 검색

    const userInfoResponse = await axios.get(accessTokenUrl, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });


    return userInfoResponse.data
}

// 소셜 로그인
export async function socialLogin(req, res) {
    try {
        const { site } = req.params;
        const { code } = req.body;
        let userInfo = ''
        let authTokenUrl = ''
        let accessTokenUrl = ''
        let data = new URLSearchParams();
        let token = null;
        let result = {};
        result.login = false;
        if (site === 'kakao') {
            authTokenUrl = `https://kauth.kakao.com/oauth/token`
            data.append('client_id', process.env.KAKAO_REST_API_KEY)
            data.append('grant_type', 'authorization_code');
            data.append('redirect_uri', process.env.KAKAO_REDIRECT_URI);
            data.append('code', code)
            accessTokenUrl = 'https://kapi.kakao.com/v2/user/me'
            userInfo = await getUserDate(authTokenUrl, data, accessTokenUrl);

            const result2 = await loginRepository.login(userInfo.id)
            if (result2.cnt === 0) {
                await signRepository.insertUser(userInfo.id, 0, userInfo.kakao_account.email, userInfo.properties.nickname)
            }
            token = jwt.sign({ id: userInfo.id, id_idx: result2.id_idx }, '556pT=W6Pr')
            result.token = token;
            result.login = true;

        } else if (site === 'naver') {
            authTokenUrl = `https://nid.naver.com/oauth2.0/token`
            data.append('client_id', process.env.NAVER_CLIENT_ID)
            data.append('client_secret', process.env.NAVER_CLIENT_SECRET)
            data.append('state', 'STATE_STRING')
            data.append('code', code)
            data.append('grant_type', 'authorization_code');
            
            accessTokenUrl = 'https://openapi.naver.com/v1/nid/me'
            userInfo = await getUserDate(authTokenUrl, data, accessTokenUrl);
            const result2 = await loginRepository.login(userInfo.response.id)

            if (result2.cnt === 0) {
                await signRepository.insertUser(userInfo.response.id, 0, userInfo.response.email, userInfo.response.name)
            }
            token = jwt.sign({ id: userInfo.response.id, id_idx: result2.id_idx}, '556pT=W6Pr')
            result.token = token;
            result.login = true;

        } else if (site === 'google') {
            authTokenUrl = `https://oauth2.googleapis.com/token`;
            data.append('code', code);
            data.append('client_id', process.env.GOOGLE_CLIENT_ID);
            data.append('client_secret', process.env.GOOGLE_CLIENT_SECRET);
            data.append('redirect_uri', process.env.GOOGLE_REDIRECT_URI);
            data.append('grant_type', 'authorization_code');
            accessTokenUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
            userInfo = await getUserDate(authTokenUrl, data, accessTokenUrl);
            const result2 = await loginRepository.login(userInfo.id)

            if (result2.cnt === 0) {
                await signRepository.insertUser(userInfo.id, 0, userInfo.email, userInfo.name)
            }
            token = jwt.sign({ id: userInfo.id, id_idx: result2.id_idx }, '556pT=W6Pr')
            result.token = token;
            result.login = true;

        }
        res.json(result);




    }
    catch (error) {
        // console.error("사용자 정보를 가져오는 중 오류 발생:", error);
        // res.status(500).json({
        //     error: "사용자 정보를 가져오는 중 오류 발생",
        // });
        console.log('연동로그인 에러');
    }
}



