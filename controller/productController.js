import * as productRepository from '../repository/productRepository.js';

// 메인 책 리스트
export async function getList(req, res) {
    try {
        let { genre, startIndex ,pageSize} = req.params;
        let result = await productRepository.getList(genre, startIndex ,pageSize);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}

//책상새
export async function getDetail(req, res) {
    let { id, uid } = req.params;
    try {
        const result = await productRepository.getDetail(uid, id);
        res.json(result);
    } catch (error) {
        console.error('Error fetching book details:', error);
        res.status(500).send('An error occurred while fetching book details.');
    }
}
// export async function getDetail(req, res) {
//     let { id, uid } = req.params;
//     try {
//         // Promise.all을 사용하여 모든 쿼리를 병렬로 실행
//         const [bookData, rentData, reservationData, reviewList] = await Promise.all([
//             productRepository.getDetail(uid, id),
//             productRepository.getRentHistory(id),
//             productRepository.getRervation(uid, id),
//             productRepository.getReview(id),
//         ]);

//         // reservationData의 존재 여부에 따라 reservationData 상태 설정
//         const isReservationAvailable = reservationData.length > 0;

//         // 최종 결과를 JSON 형태로 클라이언트에 전송
//         res.json({
//             bookData: bookData[0],
//             rentData: rentData[0],
//             reviewList: reviewList,
//             reservationData: isReservationAvailable,
//         });
//     } catch (error) {
//         console.error('Error fetching book details:', error);
//         res.status(500).send('An error occurred while fetching book details.');
//     }
// }

//좋아요버튼
export async function bookLike(req, res) {
    try {
        const { user_id, book_id, user_liked } = req.body.data;
        let result = null;
        if (user_liked === 0) {
            result = await productRepository.bookLike(user_id, book_id);
        } else {
            result = await productRepository.bookUnLike(user_id, book_id);
        }
        res.json(result);
    } catch (error) {
        console.error('Error in bookLike:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// 책대여
export async function bookRent(req, res) {
    try {
        const { user_id, book_id, rent_date, expected_return_date } = req.body.data;
        const result = await productRepository.bookRent(user_id, book_id, rent_date, expected_return_date);
        res.json(result);
    } catch (error) {
        console.error('Error in bookRent:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//책반납
export async function bookReturn(req, res) {
    try {
        const { user_id, book_id } = req.body.data;
        const result = await productRepository.bookReturn(user_id, book_id);
        res.json(result);
    } catch (error) {
        console.error('Error in bookReturn:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//책 예약
export async function bookReservation(req, res) {
    try {
        const { user_id, book_id, created_at } = req.body.data;
        const result = await productRepository.bookReservation(user_id, book_id, created_at);
        res.json(result);
    } catch (error) {
        console.error('Error in bookReservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//책 예약 취소
export async function bookReservationCancel(req, res) {
    try {
        const { user_id, book_id, cancel_at } = req.body.data;
        const result = await productRepository.bookReservationCancel(cancel_at, user_id, book_id);
        res.json(result);
    } catch (error) {
        console.error('Error in bookReservationCancel:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// export async function bookReservationCancel(req, res) {
//     const { user_id, book_id, cancel_at } = req.body.data;
//     const result = await productRepository.bookReservationCancel(cancel_at, user_id, book_id);
//     res.json(result);
// }

export async function myPage(req, res) {
    try {
        let { user_id, tab } = req.params;
        let result = null;
        if (tab === 'history') {
            result = await productRepository.myPageReturnHistory(user_id);
        } else if (tab === 'rent') {
            result = await productRepository.myPageRentHistory(user_id);
        } else {
            result = await productRepository.myPageReserve(user_id);
            console.log(result);
        }
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}
