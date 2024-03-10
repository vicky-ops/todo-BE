import {Request,Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface UserRequest extends Request{
    user?:{
        id:string;
    };
}


const auth = (req: Request, res:Response,next: NextFunction) =>{
    const token = req.header('x-auth-token');
    
    if(!token){
        return res.status(401).json({
            msg:'No token, authorization denied'
        })
    }

    try{
        const decoded = jwt.verify(token,'jwtSecret');

        req.body.user = (decoded as any).user;

        next();
    }catch(err){
        res.status(401).json({msg:'Token is not valid'})
    }
}

export default auth;