const colors = require("colors");
const http = require("../service/HTTPService");

class Tasks {
  _list;

  constructor(){
    this._list = {};
  };

  async createTask(task){
    const dataToSend = {
      "name": task.name
    };

    this._list[task.id] = task;

    try{
      const data = await http.post(dataToSend);
      return data;
    }catch(error){
      console.log(error);
    };
  };

  async loadDB(){
    try{  
      const { data } = await http.get();
      data.result.forEach( task =>{
        this._list[task["_id"]] = task;
      });
    }catch(error){
      console.log(error);
    }
  };

  get listTask(){
    const tasks = Object.values(this._list);

    return tasks;
  };

  getAllTask(){
    this.getDescription(this.listTask);
  };

  getDescription(array){
    array.forEach((task,index)=>{
      const idx = `${ index + 1 }.`.green;
      const { name, completedAt } = task;
      const status = completedAt ? "Completed".green : "Pending".red;

      console.log(`${ idx } ${ name } :: ${ status } :: ${ completedAt ?? "" }`);
    });
  };

  getCompletedOrPending(tasksCompleted = true){
    const completed = this.listTask.filter( task => task.completedAt);
    const pending = this.listTask.filter( task => task.completedAt===null);

    if(tasksCompleted){
      this.getDescription(completed);
    }else{
      this.getDescription(pending);
    };
  };

  async deleteATask(id){
    if(this._list[id]){
      delete this._list[id];
    };

    try{
      const data = await http.delete(id);
      console.log("Task was deleted!");
    }catch(error){
      console.log(error);
    };
  };

  toggleTaskState(ids = []){
    ids.forEach( id =>{
      if(this._list[id]){
        this._list[id].completedAt = new Date().toISOString();
        this.toggleStateFromDB(id);
      };
    });
    
    this.listTask.forEach( task =>{
      if(!ids.includes(task["_id"])){
        this._list[task["_id"]].completedAt = null;
        this.toggleStateFromDB(task["_id"]);
      };
    });
  };

  async toggleStateFromDB(id){
    try{
      const result = await http.put(id);
      console.log("Update");
    }catch(error){
      console.log(error);
    };
  };
};

module.exports = Tasks;