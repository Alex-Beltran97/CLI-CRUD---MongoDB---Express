const { Todo } = require("../models/schemas");
const { v4: uuidv4 } = require("uuid");

const getTasks = (req,res) =>{
  try{
    Todo.find({},(err, result)=>{
      if(err) throw new Error(err);
  
      return res.status(200).json({result});
    }); 
  }catch(error){
    return res.status(500).json({error});
  };
};

const createTask = (req,res) =>{
  const newTask = new Todo({
    _id:uuidv4(),
    name:req.body.name,
    completedAt: null
  });
  try{
    newTask.save((err, newTask)=>{
      if(err) throw new Error(err);
  
      return res.status(201).json({newTask});
    }); 
  }catch(error){
    return res.status(500).json({error});
  };
};

const updateTask = async (req,res) =>{
  const { params } = req;

  Todo.findOne({_id: params.id}, async (error,user)=>{
    if(error){
      res.json({error});
      return
    };
    
    const task = await Todo.findOneAndUpdate({"_id": params.id },{ completedAt: user.completedAt !== null ? null : new Date().toISOString() }, { new: true });

    res.status(200).send(task);
  });
};

const deleteTasks = (req,res) =>{
  const { params } = req;
  try{
    Todo.deleteOne({ _id: params.id },(err, result)=>{
      if(err) throw new Error(err);
  
      return res.status(200).json({result});
    }); 
  }catch(error){
    return res.status(500).json(error);
  };
};


module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTasks
};