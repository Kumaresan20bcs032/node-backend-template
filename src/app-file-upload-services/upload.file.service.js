import fs from 'node:fs';
import path from 'node:path';
import Files from './app.file.model';
import * as response from '../utils/response.handler'
class FileUploadService {
    uploadFile = async (req, res) => {
        try {
            //This is sample example, you can add any file file-formats and customize your own
            //File types
            const supportedFileFormats = ['image', 'video', 'audio'];

            //File sub-types
            const videoFormats = ['mp4', 'webm', 'avi', 'mov', 'mkv', 'flv'];
            const audioFormats = ['mp3', 'aac', 'ogg', 'wav', 'flac'];
            const imageFormats = ['jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'tiff'];

            if (!req?.files) {
                return response.errorResponse(res, 400, 'Empty request should not be accepted');
            }
            if (!req.files?.media) {
                return response.errorResponse(res, 400, 'File name should be media');
            }
            if (!req.body?.service) {
                return response.errorResponse(res, 400, 'Service name is required');
            }

            const filePath = path.join(req.body.service, Date.now().toString(), req.files.media.name);
            const uploadPath = path.join(process.cwd(), 'files', 'uploads', filePath);

            if (!fs.existsSync(path.dirname(uploadPath))) {
                fs.mkdirSync(path.dirname(uploadPath), { recursive: true });
                console.log('New directory created ...');
            }
            else {
                console.log('Directory already exists !!!');
            }

            //File types and formats are extracting
            const fileType = req.files.media.mimetype.split('/')[0].toLowerCase();
            const fileFormat = req.files.media.mimetype.split('/')[1].toLowerCase();

            if (!supportedFileFormats.includes(fileType)) {
                return response.errorResponse(res, 400, 'Only supported file formats are [video,audio,image]');
            }

            //Checking supported file type and sub-type formats
            switch (fileType) {
                case 'image':
                    if (!imageFormats.includes(fileFormat)) {
                        return response.errorResponse(res, 400, 'Image file format is not supported');
                    }
                    break;
                case 'video':
                    if (!videoFormats.includes(fileFormat)) {
                        return response.errorResponse(res, 400, 'Video file format is not supported');
                    }
                    break;
                case 'audio':
                    if (!audioFormats.includes(fileFormat)) {
                        return response.errorResponse(res, 400, 'Audio file format is not supported')
                    }
                    break;
            }

            req.files.media.mv(uploadPath);

            //['http://localhost:3000/uploads/'] keep the url in .env files to access dynamic and safe and also replace your host url
            const fileServeHost = process.env.FILE_HOST || 'http://localhost:3000/uploads/';
            const fileServerPath = fileServeHost + filePath.replace(/\\/g, '/');

            //creating mongoose object
            //Warning:I am not saving this object in db but you can save it your db
            const file = new Files({
                media: req.files.media.name,
                service: req.body.service,
                file_type: fileType,
                file_tormat: fileFormat,
                url: fileServerPath
            })

            //Customize your response according to your needs and don't forgot to save in your db
            //This is testing purpose i am not saved in my database
            return response.successResponse(res, 200, 'File uploaded successfully', file)
        }
        catch (error) {
            return response.errorResponse(res, 500, error.message);
        }
    }
}

export default new FileUploadService();