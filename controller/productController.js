
import * as productRepository from '../repository/productRepository.js'

const list = [
    {
        "image": "imgupload/img1.jpg",
        "book_name": "book_name1",
        "author": "author Name 1",
        "publisher": "publisher Name 1",
        "publicationdate": "2020-01-01",
        "income_date": "2020-02-01",
        "memo": "This is a description for book 1.",
        "PurchasePath": "Online Store",
        "genre": "Development",
        "status": "Stock"
    },
    {
        "book_name": "book_name2",
        "image": "imgupload/img2.jpg",
        "author": "author Name 2",
        "publisher": "publisher Name 2",
        "publicationdate": "2019-03-15",
        "income_date": "2019-04-20",
        "memo": "This is a description for book 2.",
        "PurchasePath": "Local Bookstore",
        "genre": "Marketing",
        "status": "Rented"
    },
    {
        "image": "imgupload/img3.jpg",
        "book_name": "book_name3",
        "author": "author Name 3",
        "publisher": "publisher Name 3",
        "publicationdate": "2018-05-10",
        "income_date": "2018-06-11",
        "memo": "This is a description for book 3.",
        "PurchasePath": "Online Store",
        "genre": "General",
        "status": "Stock"
    },
    {
        "book_name": "book_name4",

        "image": "imgupload/img4.jpg",
        "author": "author Name 3",
        "publisher": "publisher Name 3",
        "publicationdate": "2018-05-10",
        "income_date": "2018-06-11",
        "memo": "This is a description for book 3.",
        "PurchasePath": "Online Store",
        "genre": "Development",
        "status": "Rented"
    },
    {
        "book_name": "book_name5",

        "image": "imgupload/img5.jpg",
        "author": "author Name 4",
        "publisher": "publisher Name 4",
        "publicationdate": "2018-05-10",
        "income_date": "2018-06-11",
        "memo": "This is a description for book 4.",
        "PurchasePath": "Online Store",
        "genre": "Development",
        "status": "Stock"
    },
    {
        "book_name": "book_name6",

        "image": "imgupload/img6.jpg",
        "author": "author Name 5",
        "publisher": "publisher Name 5",
        "publicationdate": "2018-05-10",
        "income_date": "2018-06-11",
        "memo": "This is a description for book 5.",
        "PurchasePath": "Online Store",
        "genre": "General",
        "status": "Stock"
    },
    {
        "book_name": "book_name7",
        "image": "imgupload/img7.jpg",
        "author": "author Name 6",
        "publisher": "publisher Name 6",
        "publicationdate": "2018-05-10",
        "income_date": "2018-06-11",
        "memo": "This is a description for book 6.",
        "PurchasePath": "Online Store",
        "genre": "General",
        "status": "overdue"
    },
    {
        "book_name": "book_name8",
        "image": "imgupload/img8.jpg",
        "author": "author Name 7",
        "publisher": "publisher Name 7",
        "publicationdate": "2018-05-10",
        "income_date": "2018-06-11",
        "memo": "This is a description for book 7.",
        "PurchasePath": "Online Store",
        "genre": "Marketing",
        "status": "Stock"
    },
    {
        "book_name": "book_name9",
        "image": "imgupload/img9.jpg",
        "author": "author Name 8",
        "publisher": "publisher Name 8",
        "publicationdate": "2018-05-10",
        "income_date": "2018-06-11",
        "memo": "This is a description for book 8.",
        "PurchasePath": "Online Store",
        "genre": "Marketing",
        "status": "Rented"
    }
]

export async function getList(req, res) {
    const result  = await productRepository.getList();
    console.log(result);
    res.json(list)
}

export async function getDetial(req, res) {
    let {bid} = req.params;   
    res.json(list[bid-1])

}