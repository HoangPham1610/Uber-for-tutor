import * as mysql from 'mysql';
import * as dotenv from 'dotenv';
import {promisify} from 'util';

class ConnectDatabase {

	private pool: mysql.Pool;	
	private poolConnection: mysql.PoolConnection;
	private mysqlConfig: mysql.PoolConfig;
	constructor() {
		dotenv.config();
		this.mysqlConfig = {
			connectionLimit: 10,
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME
		}
		this.createConnection();
		promisify(this.asyncQuerry);
	}
	private createConnection(): void {
		this.pool =  mysql.createPool(this.mysqlConfig);
		this.pool.getConnection((err: mysql.MysqlError, connection: mysql.PoolConnection) => {
			if (err) {
				console.log('Get connection error');
				throw err;
			} else {
				this.poolConnection = connection;
			}
		});
	}

	private beginTransaction() {
		this.poolConnection.beginTransaction((err: mysql.MysqlError) => {
			if (err) {
				console.log('Begin transaction error');
				throw err;
			}
		});
	}

	private endTransaction() {
		this.poolConnection.release();
	}

	public asyncQuerry(sql: string, params: any) {
		return new Promise((resolve, reject) => {
			try {
				this.beginTransaction();
				this.poolConnection.query(sql, params, (err: mysql.MysqlError, results: any) => {
					if (err) {
						this.poolConnection.rollback();
						reject(err);
					} else {
						resolve(results);
						console.log('query result: ', results);
					}
				});
				console.log('await query');
				this.poolConnection.commit((err) => {
					if (err) {
					  return this.poolConnection.rollback(function() {
						throw err;
					  });
					}
				});
				this.endTransaction();
			} catch (err) {
				throw err;
			}
		});
	}
	public query(sql: string, params: any) {
		let queryResults = null;
		try {
			this.beginTransaction();
			this.poolConnection.query(sql, params, (err: mysql.MysqlError, results: any) => {
				if (err) {
					this.poolConnection.rollback();
					throw err;
				} else {
					queryResults = results;
					console.log('query result: ', results);
				}
			});
			console.log('await query');
			this.poolConnection.commit((err) => {
				if (err) {
				  return this.poolConnection.rollback(function() {
					throw err;
				  });
				}
			});
			this.endTransaction();
		} catch (err) {
			throw err;
		}
		console.log('result query');
		return queryResults;
	}

	// public load(sql) {
	// 	return new Promise((resolve, reject) => {

	// 		this.pool.query(sql, (err, rows, field) => {
	// 			this.poolConnection.release();
	// 			if (err) {
	// 				reject(err)
	// 			} else {
				
	// 				resolve(JSON.parse(JSON.stringify(rows)));
	// 			}
	// 		})
	// 	});
	// }

	// public save(sql) {
	// 	return new Promise((resolve, reject) => {
	// 		this.pool.query(sql, (err, rows, field) => {
	// 			this.poolConnection.release();
	// 			if (err) {
	// 				reject(err)
	// 			} else {
	// 				resolve(JSON.parse(JSON.stringify(rows)));
	// 			}
	// 		})
	// 	});
	// }
}

export default new ConnectDatabase();
