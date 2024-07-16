import * as response from '../../../utils/response.handler'
import * as crypto from '../../../app-core-services/crypto.service'
export const createAdmin = async (req, res) => {
    try {
        const response= crypto.encryptText(req.body.text)
        const decrypt=crypto.decryptText(response) 
        console.log(response)
        return res.json({'encryptData':response,'decrypt':decrypt})
    }
    catch (error) {
        return response.errorResponse(res, 500, error.message);
    }
}