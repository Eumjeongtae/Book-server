import * as managerRepository from '../repository/managerRepository.js';

export async function getManagerList(req, res) {
    try {
        const { id_idx } = req.params;
        const result = await managerRepository.authorityCheck(id_idx);
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
        console.log(result);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}

export async function bookEdit(req, res) {
    const { id_idx, book_id } = req.params;
    const result = await managerRepository.bookEdit(id_idx, book_id);
    res.json(result);
}

export async function modify(req, res) {
    try {
        const {
            id,
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
        const result = await managerRepository.modifyBook(
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
            id
        );
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}

export async function deleteBook(req, res) {
    let { id } = req.params;
    
    try {
        const result = await managerRepository.deleteBook(id);
        res.json(result === 'success' ? true : false);
    } catch (error) {
        console.log(error);
    }
}
