import { rateLimit } from 'express-rate-limit';

//This function is setting options for api-rate limit based on particular IP
export const expressRateLimitOptions = () => {
    const limiter = rateLimit({
        windowMs: 1 * 60 * 1000,
        limit: 50,
        standardHeaders: 'draft-7',
        legacyHeaders: false, //set true in case allowing X-forward-* headers
        message: 'server overloaded due to many request from single-user'
    })
    return limiter;
}