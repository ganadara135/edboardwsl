import * as Redis from "ioredis";

// console.log("process.env.NODE_ENV : "+process.env.NODE_ENV)
// console.log("process.env.REDIS_HOST : "+process.env.REDIS_HOST) 

export const redis = 
process.env.NODE_ENV === 'production'
   ? new Redis(process.env.REDIS_HOST)
   : new Redis(process.env.REDIS_HOST);
   // : new Redis(process.env.REDIS_IP)
