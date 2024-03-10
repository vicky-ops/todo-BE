import express,{Request,Response} from 'express';
import Todo from '../models/Todo';
import auth from "../middleware/auth"

const router = express.Router();

// Addign todo
router.post('/',auth,async(req:Request,res:Response)=>{
    const {title} = req.body;

    try{
        const newTodo = new Todo({
            title,
            user:req.body.user.id
        })
        const todo = await newTodo.save();
        res.json(todo);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})


// Update todo

router.put("/:id",auth,async(req:Request,res:Response)=>{
    const {title,completed} = req.body;

    try{
        let todo = await Todo.findById(req.params.id);
        if(!todo){
            return res.status(404).json({
                msg:'Todo not found'
            });
        }
        
        if(todo.user.toString()!== req.body.user.id){
            return res.status(401).json({
                msg:'Not Authorized'
            });
        }

        todo.title = title
        todo.completed = completed;

        await todo.save();

        res.json(todo);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// Delete Todo
router.delete("/:id",auth,async(req:Request,res:Response)=>{
    try{
        let todo = await Todo.findById(req.params.id);

        if(!todo){
            return res.status(404).json({msg:'Todo not found'});
        }

        if(todo.user.toString()!==req.body.user.id){
            return res.status(401).json({msg:'Not Autorized'});
        }

        await todo.deleteOne();
        res.json({msg:'Todo removed'});
    }catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})


// get all the todos mapped to the authenticated user
router.get('/user',auth,async(req:Request,res:Response)=>{
    try{
        // Get the userid f
        const userId  = (req as any).user.id;

        //Retive todos that are mapped to the user
        const todos = await Todo.find({user:userId});

        // if no tods found
        if(!todos || todos.length===0){
            return res.status(404).json({msg:"No todos found for the user"});
        }
        res.json(todos)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

export default router;
