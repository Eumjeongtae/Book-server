import * as loginRepository from '../repository/loginRepository.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export async function login(req, res) {
    const { id, password } = req.body.data;
    const result = await loginRepository.login(id);
    result.login = false;

    let token = null;
    if (result.cnt === 1) {
        if (await bcrypt.compare(password, result.password)) {
            result.login = true;

            token = jwt.sign({ id: id, email: result.email }, '556pT=W6Pr')

            result.token = token;
        }
    }

    res.json({data:result})

}