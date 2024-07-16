import mongoose from 'mongoose'
import chalk from 'cli-color' //chalk is used to make color difference in console.log()

//This class handles the mongoDb connection related works
class MongoDbConnection {
    constructor() {
        mongoose.connect(process.env.MONGO_URL);
        mongoose.connection.on('connected', () => console.log(chalk.cyanBright.bold.italic('MongoDb connected successfully...')));
        mongoose.connection.on('reconnected', () => console.log(chalk.blueBright.bold.italic('MongoDb reconnected successfully...')));
        mongoose.connection.on('disconnected', () => console.log(chalk.redBright.bold.italic('MongoDb disconnected!!!')));
    }
}

export default MongoDbConnection;
