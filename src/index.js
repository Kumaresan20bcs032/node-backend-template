import express, { urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import chalk from 'cli-color';
import appInitialize from './app-configurations/middleware.configuration';
import mongoDbConnection from './app-configurations/mongoose.configuration';
import * as response from './utils/response.handler';
import * as rateLimit from './utils/api.rate.limit';
const app = express();

//@Declare all middlewares Here
app.use(cors()); //Enabling CORS for communicating different origins
app.use(helmet()); //Increasing security mechanism for express application based on http headers
app.use(rateLimit.expressRateLimitOptions()); //To set rate limit based on your needs
app.use(express.json({ limit: '50mb' })); //Parse the incoming body request
app.use(urlencoded({ extended: true }));
app.use(fileUpload()); //Express file upload middleware
app.use('/uploads', express.static('./files/uploads')); //It can serves static files from files/uploads in root directory, if you need you can change according to your business logic
// app.use((err, req, res, next) => {
//   return response.errorResponse(res, 500, 'Internal server error')
// });
app.get('/', (req, res) => {
  return response.successResponse(res, 200, 'Application working well');
}); //Initial Request to checking application as working

new mongoDbConnection();
new appInitialize(app);


app.listen(process.env.PORT || 3000, () => {
  console.log(chalk.magentaBright.bold.italic(`server started at port ${process.env.PORT || 3000}`))
});

