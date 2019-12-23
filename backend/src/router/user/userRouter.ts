import {Router, Request, Response, NextFunction} from 'express';
import { USER } from '../../common/path';
import User from '../../model/User';
import * as bcrypt from 'bcryptjs';
import { isNullOrUndefined } from 'util';
import { ERR_MESSAGE, SUCCESS_MESSAGE } from '../../common/message';
import * as uuid from 'uuid';
import { insertUser, getListUser, getUserInfo, getListTeacher, getListStudent } from '../../service/user/user.service';
class UserRouter {
    public router: Router = Router();

    constructor() {
        this.initRouter();
    }

    // userRouter.get()

    /**
     * Init user router
     */
    private initRouter(): void {
        /**
         * Register user
         */
        this.router.post(USER.SIGNUP, async (req: Request, res: Response, next: NextFunction) => {
            console.log('Start router insert user');
            const username = req.body.username;
            const password = req.body.password;
            const email = req.body.email;

            if (isNullOrUndefined(username) === true) {
                res.json({message: ERR_MESSAGE.USERNAME_EMPTY});
            } else if (isNullOrUndefined(password) === true) {
                res.json({message: ERR_MESSAGE.PASSWORD_EMPTY});
            } else if (isNullOrUndefined(email) === true) {
                res.json({message: ERR_MESSAGE.EMAIL_EMPTY});
            } else {
                const userId = uuid();
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(password, salt);
                const userInfo = [userId, username, hashPassword, email];
                const result = await insertUser(userInfo);
                res.json(
                    { message: SUCCESS_MESSAGE.SIGIN_SUCCESS,
                      user: result
                    });
            }
        });

        /**
         * Get list user
         */
        this.router.get(USER.GET_LIST_USER, async (req, res) => {
            const listUser = await getListUser(1);
            res.json({listUser: listUser});
        });

        /**
         * Get user info
         */
        this.router.get(USER.GET_USER_INFO, async (req, res) => {
            const {userId} = req.query;
            const userInfo = await getUserInfo(userId);
            res.json({
                userInfo: userInfo
            })
        });

        /**
         * Get list teacher
         */
        this.router.get(USER.GET_LIST_TEACHER, async (req, res) => {
            const listTeacher = await getListTeacher(1);
            res.json({listTeacher: listTeacher});
        })

        /**
         * Get list student
         */
        this.router.get(USER.GET_LIST_STUDENT, async (req, res) => {
            const listStudent = await getListStudent(1);
            res.json({listStudent: listStudent});
        })
    }
}

export default new UserRouter().router;