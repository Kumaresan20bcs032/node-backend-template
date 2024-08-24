import express from 'express';

const adminRouter = express.Router();

import * as admin from '../../../../modules/v1/admin-component/admin.controller';

//ADMIN ROUTES

adminRouter.get('/', admin.createAdmin);
adminRouter.get('/login', admin.loginAdmin);

export default adminRouter;