

export async function newBook(req,res) {
    const {book_name,author,image,publisher,publication_date,income_type,income_method,income_date,genre,status,memo} = req.body.data
    console.log({book_name,author,image,publisher,publication_date,income_type,income_method,income_date,genre,status,memo});

    
}