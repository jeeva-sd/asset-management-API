import MongoDBConnection from './connection';

const database = new MongoDBConnection();
database.getConnection();

export default database;