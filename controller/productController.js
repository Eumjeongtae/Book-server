const list = [
    {
        "image": "img1.jpg",
        "title": "title1",
        "Author": "Author Name 1",
        "Publisher": "Publisher Name 1",
        "PublishDate": "2020-01-01",
        "PurchaseDate": "2020-02-01",
        "BookInfo": "This is a description for book 1.",
        "PurchasePath": "Online Store",
        "Category": "Development",
        "Status": "Stock"
    },
    {
        "title": "title2",
        "image": "img2.jpg",
        "Author": "Author Name 2",
        "Publisher": "Publisher Name 2",
        "PublishDate": "2019-03-15",
        "PurchaseDate": "2019-04-20",
        "BookInfo": "This is a description for book 2.",
        "PurchasePath": "Local Bookstore",
        "Category": "Marketing",
        "Status": "Rented"
    },
    {
        "image": "img3.jpg",
        "title": "title3",
        "Author": "Author Name 3",
        "Publisher": "Publisher Name 3",
        "PublishDate": "2018-05-10",
        "PurchaseDate": "2018-06-11",
        "BookInfo": "This is a description for book 3.",
        "PurchasePath": "Online Store",
        "Category": "General",
        "Status": "Stock"
    },
    {
        "title": "title4",

        "image": "img4.jpg",
        "Author": "Author Name 3",
        "Publisher": "Publisher Name 3",
        "PublishDate": "2018-05-10",
        "PurchaseDate": "2018-06-11",
        "BookInfo": "This is a description for book 3.",
        "PurchasePath": "Online Store",
        "Category": "Development",
        "Status": "Rented"
    },
    {
        "title": "title5",

        "image": "img5.jpg",
        "Author": "Author Name 4",
        "Publisher": "Publisher Name 4",
        "PublishDate": "2018-05-10",
        "PurchaseDate": "2018-06-11",
        "BookInfo": "This is a description for book 4.",
        "PurchasePath": "Online Store",
        "Category": "GenDevelopmenteral",
        "Status": "Stock"
    },
    {
        "title": "title6",

        "image": "img6.jpg",
        "Author": "Author Name 5",
        "Publisher": "Publisher Name 5",
        "PublishDate": "2018-05-10",
        "PurchaseDate": "2018-06-11",
        "BookInfo": "This is a description for book 5.",
        "PurchasePath": "Online Store",
        "Category": "General",
        "Status": "Stock"
    },
    {
        "title": "title7",
        "image": "img7.jpg",
        "Author": "Author Name 6",
        "Publisher": "Publisher Name 6",
        "PublishDate": "2018-05-10",
        "PurchaseDate": "2018-06-11",
        "BookInfo": "This is a description for book 6.",
        "PurchasePath": "Online Store",
        "Category": "General",
        "Status": "Stock"
    },
    {
        "title": "title8",
        "image": "img8.jpg",
        "Author": "Author Name 7",
        "Publisher": "Publisher Name 7",
        "PublishDate": "2018-05-10",
        "PurchaseDate": "2018-06-11",
        "BookInfo": "This is a description for book 7.",
        "PurchasePath": "Online Store",
        "Category": "Marketing",
        "Status": "Stock"
    },
    {
        "title": "title9",
        "image": "img9.jpg",
        "Author": "Author Name 8",
        "Publisher": "Publisher Name 8",
        "PublishDate": "2018-05-10",
        "PurchaseDate": "2018-06-11",
        "BookInfo": "This is a description for book 8.",
        "PurchasePath": "Online Store",
        "Category": "Marketing",
        "Status": "Rented"
    }
]

export async function getList(req, res) {
    res.json(list)
}

export async function getDetial(req, res) {
    let {bid} = req.params;   
    res.json(list[bid])

}