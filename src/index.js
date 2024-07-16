import express, { urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import chalk from 'cli-color';
import appInitialize from './app-configurations/middleware.configuration';
import mongoDbConnection from './app-configurations/mongoose.configuration';
import * as response from './utils/response.handler';
import * as rateLimit from './utils/api.rate.limit';
const app = express();

//@Declare all middlewares Here
app.use(cors()); //Enabling CORS for communicating different origins
app.use(express.json({ limit: '50mb' })); //Parse the incoming body request
app.use(urlencoded({ extended: true }));
app.use(rateLimit.expressRateLimitOptions()); //To set rate limit based on your needs
app.use(helmet()); //Increasing security mechanism for express application based on http headers

app.get('/', (req, res) => {
  return response.successResponse(res, 200, 'Application working well');
}); //Initial Request to checking application as working

new mongoDbConnection();
new appInitialize(app);

app.listen(process.env.PORT || 3000, () => {
  console.log(chalk.magentaBright.bold.italic(`server started at port ${process.env.PORT || 3000}`))
});

