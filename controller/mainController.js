import * as mainRepository from '../repository/mainRepository.js';

// 메인 책 리스트
export async function getMain(req, res) {
    try { 
        let result = await mainRepository.getMain();
        res.json(result)
    } catch (error) {
        console.log(error);
    }
}

