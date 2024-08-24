import fs from 'node:fs';
import path from 'path';
import * as response from '../utils/response.handler';

//This class handles to delete the file
class FileDeleteService {
    deleteFile = async (req, res) => {
        try {
            const location = req.body.image_url;//this one take the image path
            const checkPath = path.join(process.cwd(), 'files', 'uploads', location.split(process.env.FILE_HOST)[1]);
            const isExist = fs.existsSync(checkPath);

            //check if the file is exists are not
            if (!isExist) {
                return response.errorResponse(res, 'File not found to delete', 400)
            }

            //It removes the file form the directory
            fs.unlink(checkPath, (err) => {
                if (err) {
                    throw err;
                } else {
                    return response.successResponse(res, 200, 'File deleted successfully', {});
                }
            })
        }
        catch (error) {
            return response.errorResponse(res, 500, error.message);
        }
    }
}

export default new FileDeleteService();

