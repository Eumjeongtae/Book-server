import * as managerRepository from '../repository/managerRepository.js'




export async function getManagerList(req,res) {
    const {id_idx} = req.params;
    const result = await managerRepository.authorityCheck(id_idx);
    console.log(result);
    res.json(result)
}