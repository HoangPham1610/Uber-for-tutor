import connection from "../../util/database/connect";

export const insertUser = (userInfo: Array<String>) => {
  const sql = `INSERT INTO user(user_id, username, password, email) VALUES (?, ?, ?, ?)`;
  const params = [...userInfo];
  const results = connection.asyncQuery(sql, params);
  return results;
};

/**
 * Get user by user id
 * @param userId user id
 */
export const getUserInfo = (userId: string) => {
  const sql = `SELECT 
                  user_id
                  , username
                  , full_name
                  , email
                  , phone_number
                  , avatar
                  , address_id
                  , role_id
              FROM user
              WHERE user_id = ?`;
  const param = userId;
  const results = connection.asyncQuery(sql, param);
  return results;
};

/**
 * Get list user
 * @param pageNumber pageNumber
 */
export const getListUser = (pageNumber: number) => {
  const sql = `SELECT 
                  user_id
                  , username
                  , full_name
                  , email
                  , phone_number
                  , avatar
                  , address_id
                  , role_id
              FROM user
              WHERE delete_flag = 0
              LIMIT 10`;
  const results = connection.asyncQuery(sql);
  return results;
};

/**
 * Get list teacher
 * @param pageNumber page number
 */
export const getListTeacher = (pageNumber: number) => {
  const sql = `SELECT user_id
                        , username
                        , full_name
                        , email
                        , phone_number
                        , avatar
                        , address_id
                        , role_id
                FROM user
                WHERE role_id = 2
                AND delete_flag = 0`;
  const results = connection.asyncQuery(sql);
  return results;
};

export const getListStudent = (pageNumber: number) => {
  const sql = `SELECT user_id
                        , username
                        , full_name
                        , email
                        , phone_number
                        , avatar
                        , address_id
                        , role_id
                FROM user
                WHERE role_id = 2
                AND delete_flag = 0`;
  const results = connection.asyncQuery(sql);
  return results;
};
