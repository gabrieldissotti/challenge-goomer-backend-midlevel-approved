import knex from 'knex'

import { databaseConfig } from '@configs/app'

type Options = {
  name: string;
  user: string;
  password: string;
  host: string;
  log: boolean;
  port: number;
  poolMin?: number;
  poolMax?: number;
};

export default class Connection {
  private options: Options

  constructor () {
    this.options = {
      name: databaseConfig.name,
      user: databaseConfig.user,
      password: databaseConfig.password,
      host: databaseConfig.host,
      log: databaseConfig.log,
      port: Number(databaseConfig.port),
      poolMin: Number(databaseConfig.poolMin),
      poolMax: Number(databaseConfig.poolMax)
    }
  }

  public async getConnectionInstance () {
    return knex({
      client: 'pg',
      connection: {
        database: this.options.name,
        user: this.options.user,
        password: this.options.password,
        host: this.options.host,
        port: this.options.port
      },
      debug: this.options.log,
      pool: {
        min: this.options.poolMin,
        max: this.options.poolMax
      }
    })
  }
}
