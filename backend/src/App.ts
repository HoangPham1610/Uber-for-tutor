// Import module
import * as express from 'express';
import * as bodyParser from 'body-parser';
import userRouter from './router/user/userRouter';
import router from './router/test/testRouter';
class App {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.init();
        this.router();
    }

    private init (): void {
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private router(): void {
        this.app.use(userRouter);
        this.app.use(router);
    }
}

export default new App().app;