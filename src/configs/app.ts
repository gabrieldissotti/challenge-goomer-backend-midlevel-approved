import 'dotenv/config'

export const env = process.env.NODE_NEV

export const redisPort = 6379
export const redisHost = process.env.REDIS_HOST || '127.0.0.1'

export const databaseConfig = {
  name: process.env.DATABASE_NAME || 'postgres',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: process.env.DATABASE_PORT || 5432,
  user: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  log: process.env.DATABASE_LOGGING === 'true' || false,
  poolMin: process.env.DATABASE_POOL_MIN || 2,
  poolMax: process.env.DATABASE_POOL_MAN || 4
}
