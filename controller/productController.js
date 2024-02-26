import * as productRepository from '../repository/productRepository.js';

// const list = [
//     {
//         "image": "imgupload/img1.jpg",
//         "book_name": "book_name1",
//         "author": "author Name 1",
//         "publisher": "publisher Name 1",
//         "publicationdate": "2020-01-01",
//         "income_date": "2020-02-01",
//         "memo": "This is a description for book 1.",
//         "PurchasePath": "Online Store",
//         "genre": "Development",
//         "status": "Stock"
//     },
//     {
//         "book_name": "book_name2",
//         "image": "imgupload/img2.jpg",
//         "author": "author Name 2",
//         "publisher": "publisher Name 2",
//         "publicationdate": "2019-03-15",
//         "income_date": "2019-04-20",
//         "memo": "This is a description for book 2.",
//         "PurchasePath": "Local Bookstore",
//         "genre": "Marketing",
//         "status": "Rented"
//     },
//     {
//         "image": "imgupload/img3.jpg",
//         "book_name": "book_name3",
//         "author": "author Name 3",
//         "publisher": "publisher Name 3",
//         "publicationdate": "2018-05-10",
//         "income_date": "2018-06-11",
//         "memo": "This is a description for book 3.",
//         "PurchasePath": "Online Store",
//         "genre": "General",
//         "status": "Stock"
//     },
//     {
//         "book_name": "book_name4",

//         "image": "imgupload/img4.jpg",
//         "author": "author Name 3",
//         "publisher": "publisher Name 3",
//         "publicationdate": "2018-05-10",
//         "income_date": "2018-06-11",
//         "memo": "This is a description for book 3.",
//         "PurchasePath": "Online Store",
//         "genre": "Development",
//         "status": "Rented"
//     },
//     {
//         "book_name": "book_name5",

//         "image": "imgupload/img5.jpg",
//         "author": "author Name 4",
//         "publisher": "publisher Name 4",
//         "publicationdate": "2018-05-10",
//         "income_date": "2018-06-11",
//         "memo": "This is a description for book 4.",
//         "PurchasePath": "Online Store",
//         "genre": "Development",
//         "status": "Stock"
//     },
//     {
//         "book_name": "book_name6",

//         "image": "imgupload/img6.jpg",
//         "author": "author Name 5",
//         "publisher": "publisher Name 5",
//         "publicationdate": "2018-05-10",
//         "income_date": "2018-06-11",
//         "memo": "This is a description for book 5.",
//         "PurchasePath": "Online Store",
//         "genre": "General",
//         "status": "Stock"
//     },
//     {
//         "book_name": "book_name7",
//         "image": "imgupload/img7.jpg",
//         "author": "author Name 6",
//         "publisher": "publisher Name 6",
//         "publicationdate": "2018-05-10",
//         "income_date": "2018-06-11",
//         "memo": "This is a description for book 6.",
//         "PurchasePath": "Online Store",
//         "genre": "General",
//         "status": "overdue"
//     },
//     {
//         "book_name": "book_name8",
//         "image": "imgupload/img8.jpg",
//         "author": "author Name 7",
//         "publisher": "publisher Name 7",
//         "publicationdate": "2018-05-10",
//         "income_date": "2018-06-11",
//         "memo": "This is a description for book 7.",
//         "PurchasePath": "Online Store",
//         "genre": "Marketing",
//         "status": "Stock"
//     },
//     {
//         "book_name": "book_name9",
//         "image": "imgupload/img9.jpg",
//         "author": "author Name 8",
//         "publisher": "publisher Name 8",
//         "publicationdate": "2018-05-10",
//         "income_date": "2018-06-11",
//         "memo": "This is a description for book 8.",
//         "PurchasePath": "Online Store",
//         "genre": "Marketing",
//         "status": "Rented"
//     }
// ]

// 메인 책 리스트
export async function getList(req, res) {
    try {
        let { genre } = req.params;
        let result = null;
        if (genre === 0) {
            result = await productRepository.getList();
        } else {
            result = await productRepository.getList(genre);
        }
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}
//책상새
export async function getDetail(req, res) {
    let { id, uid } = req.params;

    try {
        // Promise.all을 사용하여 모든 쿼리를 병렬로 실행
        const [bookData, rentData, reservationData, reviewList] = await Promise.all([
            productRepository.getDetail(uid, id),
            productRepository.getRentHistory(id),
            productRepository.getRervation(uid, id),
            productRepository.getReview(id),
        ]);

        // reservationData의 존재 여부에 따라 reservationData 상태 설정
        const isReservationAvailable = reservationData.length > 0;

        // 최종 결과를 JSON 형태로 클라이언트에 전송
        res.json({
            bookData: bookData[0],
            rentData: rentData[0],
            reviewList: reviewList,
            reservationData: isReservationAvailable,
        });
    } catch (error) {
        console.error('Error fetching book details:', error);
        res.status(500).send('An error occurred while fetching book details.');
    }
}

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

// export async function bookLike(req, res) {
//     const { user_id, book_id, user_liked } = req.body.data;
//     let result = null;
//     if (user_liked === 0) {
//         result = await productRepository.bookLike(user_id, book_id);
//     } else {
//         result = await productRepository.bookUnLike(user_id, book_id);
//     }
//     res.json(result);
// }

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

// export async function bookRent(req, res) {
//     const { user_id, book_id, rent_date, expected_return_date } = req.body.data;
//     const result = await productRepository.bookRent(user_id, book_id, rent_date, expected_return_date);
//     res.json(result);
// }

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

// export async function bookReturn(req, res) {
//     const { user_id, book_id } = req.body.data;
//     const result = await productRepository.bookReturn(user_id, book_id);
//     res.json(result);
// }

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

// export async function bookReservation(req, res) {
//     const { user_id, book_id, created_at } = req.body.data;
//     const result = await productRepository.bookReservation(user_id, book_id, created_at);
//     res.json(result);
// }

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
        }
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}
