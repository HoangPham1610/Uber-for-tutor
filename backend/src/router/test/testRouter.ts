import * as express from 'express';

class UserRouter {
    public router: express.Router = null;

    constructor() {
        this.router = express.Router();
        this.getUserInfo();
    }
    
    public getUserInfo(): void {
        this.router.get('/', (req, res) => {
            res.json({mesage: 'welcome to home page'});
        });

        this.router.get('/test', (req, res) => {
            res.json({message: 'test page'});
        });
    }

    public test(): void {
        this.router.get('/test', (req, res) => {
            res.json({message: 'test page'});
        });
    }
}

export default new UserRouter().router;