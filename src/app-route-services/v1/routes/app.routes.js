import express from 'express'
import adminRouter from './sub-routes/admin.route'
import userRouter from './sub-routes/user.route'

class ExpressRouterConfig {
    constructor() {
        this.router = express.Router()
        this.initializeRoutes()
    }
    initializeRoutes = () => {
        this.router.use('/admin', adminRouter)
        this.router.use('/user', userRouter)
    }
}

export default new ExpressRouterConfig()