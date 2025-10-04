//~ DB
export enum DbType {
  IN_MEMORY = 'IN_MEMORY',
  MONGO = 'MONGO',
  MONGOOSE = 'MONGOOSE',
  TYPE_ORM = 'TYPE_ORM',
}

//~ DB - InMemoryDb
export const DB_SEED_DATA_TOKEN: symbol = Symbol('SEED_DATA');
export const PERSIST_DATA_PATH_TOKEN: symbol = Symbol('PERSIST_DATA_PATH');
export const REPOSITORY_ENTITY_NAME_TOKEN: symbol = Symbol(
  'REPOSITORY_ENTITY_NAME',
);
export const SEED_DATA_PATH_TOKEN: symbol = Symbol('SEED_DATA_PATH');
export const seedDataFilePath = 'fixtures/seed-data.json';
// export const seedDataFilePath = 'fixtures/test.json';

//~ DB - MongoDb
export const MONGO_CLIENT_TOKEN: symbol = Symbol('MONGO_CLIENT');
export const MONGO_DB_TOKEN: symbol = Symbol('MONGO_DB');
export const REPOSITORY_COLLECTION_NAME_TOKEN: symbol = Symbol(
  'REPOSITORY_COLLECTION_NAME',
);

//~ Modules
export const ANALYTICS: string = 'analytics';
export const HABITS: string = 'habits';
export const USERS: string = 'users';
