import mongoose from 'mongoose';

const projectschema=mongoose.Schema({
   name:{
    type:String,
    required:[true,'Please provide a name for the project'],
    unique:[true,'Project name already exists'],
    trim:true,
   },
   user:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
   ]
});

const project=mongoose.model('project',projectschema);

export default project;