import * as managerRepository from '../repository/managerRepository.js';

export async function getManagerList(req, res) {
    try {
        const { id_idx } = req.params;
        const result = await managerRepository.authorityCheck(id_idx);
        console.log(result);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}

export async function newBook(req, res) {
    try {
        const {
            book_name,
            author,
            image,
            publisher,
            publication_date,
            income_type,
            income_method,
            income_date,
            genre,
            status,
            memo,
        } = req.body.data;
        const result = await managerRepository.newBook(
            book_name,
            author,
            image,
            publisher,
            publication_date,
            income_type,
            income_method,
            income_date,
            genre,
            status,
            memo
        );
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}

export async function bookEdit(req, res) {
    const { id_idx, book_id } = req.params;
    const result = await managerRepository.bookEdit(id_idx, book_id )
    console.log(result);
    res.json(result);
    
}
