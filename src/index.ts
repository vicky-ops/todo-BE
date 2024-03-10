import express,{Application, Request,Response} from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes'
import todoRoutes from "./routes/todoRoutes"


const app: Application = express();

app.use(bodyParser.json())

const mongoURI = 'mongodb+srv://workmailvicky101:98nGHKRCzaQBjmtv@cluster0.5qhuqwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose

.connect(mongoURI)
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err));

app.get('/',(req:Request,res:Response)=>{
    return res.status(200).send("working");
})
app.use('/api/users',userRoutes);
app.use('/api/todos',todoRoutes);

const PORT = process.env.PORT || 5008;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))