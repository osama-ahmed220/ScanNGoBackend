import path from 'path';
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm';
require('dotenv').config();

const setupDatabase = async () => {
  let dbConnection: Connection;
  try {
    const connectionOptions: ConnectionOptions = await getConnectionOptions();
    // const cacheAllowedEnvVar = process.env.CACHE_ALLOWED;
    // let isCacheAllowed = false;
    // if (!!cacheAllowedEnvVar) {
    //   isCacheAllowed = JSON.parse(cacheAllowedEnvVar);
    // }
    // if (!!isCacheAllowed) {
    //   (connectionOptions as any).cache = {
    //     type: "ioredis",
    //     options: redisConnectionOptions,
    //     ignoreErrors: true,
    //   };
    // }
    dbConnection = await createConnection({
      ...connectionOptions,
      extra: {
        ...(!!connectionOptions && !!connectionOptions.extra
          ? connectionOptions.extra
          : {}),
        max: process.env.TYPEORM_POOL_MAX || '10',
        ...(process.env.NODE_ENV === 'production'
          ? {
              ssl: {
                rejectUnauthorized: false,
              },
            }
          : {}),
      },
      entities: [path.join(__dirname, '/entity/**/*.{ts,js}')],
    });
    return dbConnection;
  } catch (e) {
    console.log('db error', e);
    return undefined;
  }
};

export default setupDatabase;
