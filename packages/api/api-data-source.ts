import { DataSource, DataSourceOptions } from 'typeorm';

function getDbConfig() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        type: 'sqlite' as const,
        database: 'db.sqlite',
        entities: ['dist/**/*.entity.js'],
      };
    case 'test':
      return {
        type: 'sqlite' as const,
        database: 'test.sqlite',
        entities: ['dist/**/*.entity.js'],
      };
    default: {
      throw new Error('unknown environment');
    }
  }
}

export const dbConfig: DataSourceOptions = {
  ...getDbConfig(),
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};

const apiDataSource = new DataSource(dbConfig);

export default apiDataSource;
