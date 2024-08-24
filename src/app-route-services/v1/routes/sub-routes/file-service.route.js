import express from "express";
import fileUpload from "../../../../app-file-upload-services/upload.file.service";
import fileRemove from "../../../../app-file-upload-services/delete.file.service";

const fileRouter = express.Router();


fileRouter.post('/upload', fileUpload.uploadFile);
fileRouter.delete('/remove',fileRemove.deleteFile);

export default fileRouter;