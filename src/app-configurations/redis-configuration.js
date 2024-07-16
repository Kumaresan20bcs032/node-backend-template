import redis from 'redis'
class redisConnection {
    constructor() {
        this.initilizeRedis();
    }
    initilizeRedis = async () => {
        try {
            const client = redis.createClient({

            })

        } catch (error) {
            console.log(error);
        }
    }
}
export default redisConnection;