import connection from '../../util/database/connect';

export const insertUser = (userInfo: Array<String>) => {
    const sql = `INSERT INTO user(user_id, username, password, email) VALUES (?, ?, ?, ?)`;
    const params = userInfo;

    console.log(sql +' ' + params);
    const results = connection.asyncQuerry(sql, params);
    console.log('user services: ', results);
    return results;
}