import {Router, Request, Response, NextFunction} from 'express';
class ErrorHandle {
    public router = Router();
    constructor () {
        
    }

    public notFound(req: Request, res: Response, next: NextFunction) {
        res.status(404).send({message: 'Not Found'});
        next();
    }
}


export default new ErrorHandle();