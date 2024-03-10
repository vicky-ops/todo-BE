import express,{Response,Request} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';


const router = express.Router();


router.post('/register',async(req:Request,res:Response)=>{
    const {email,password} = req.body;

    try{
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                msg:'User already exists'
            })
        }
        user = new User({
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();

        const payload = {
            user:{
                id:user.id
            }
        };

        jwt.sign(
            payload,
            'jwtSecret',
            {expiresIn:36000},
            (err,token)=>{
                if(err) throw err;
                res.json({token});
            }
        );
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post('/login',async(req:Request,res:Response)=>{
    const {email,password} = req.body;

    try{
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({msg:'Invalid email'});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({msg:'Imvalid password'})
        }

        const payload = {
            user:{
                id:user.id
            }
        };

        jwt.sign(
            payload,
            'jwtSecret',
            {expiresIn: 36000},
            (err,token)=>{
                if(err) throw err;
                res.json({token});
            }
        );
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;