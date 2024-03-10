import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document{
    title:string;
    completed:boolean;
    user:mongoose.Types.ObjectId;
}


const TodoSchema: Schema = new Schema({
    title:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
});

export default mongoose.model<ITodo>('Todo',TodoSchema);