import expressConfig from '../app-route-services/v1/routes/app.routes';
import * as response from '../utils/response.handler'

//This class handles base app route middlewares
class InitilizeApp {
    constructor(app) {
        this.app = app;
        this.InitializeMiddlewares();
    }

    InitializeMiddlewares = () => {

        this.app.use('/api/v1', expressConfig.router);

        this.app.use((req, res, next) => {
            return response.errorResponse(res, 404, 'Requested route not found')
        });

        this.app.use((err, req, res, next) => {
            console.error(err.message);
            return response.errorResponse(res, 500, 'Internal server error');
        });
    }
}

export default InitilizeApp;