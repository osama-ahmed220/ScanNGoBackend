import Redis from 'ioredis';
require('dotenv').config();

export const redisConnectionOptions: Redis.RedisOptions = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD || '',
};

export const redis = new Redis(redisConnectionOptions);
