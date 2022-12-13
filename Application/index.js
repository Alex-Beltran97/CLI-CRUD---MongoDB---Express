const { showMenu, pause, createATask, deleteATask, confirmMsg, updateATask } = require("./helpers/inquirer");
const Tasks = require("./models/Tasks");
const Task = require("./models/Task");

const main = async () =>{
  let opt;

  const tasks = new Tasks();
  
  tasks.loadDB();

  do{
    opt = await showMenu();

    switch(opt){
      case 1:
        const newTask = new Task(await createATask());
        const result = await confirmMsg(`Are you sure to create the task ${ newTask.name }`)
        if (result) tasks.createTask(newTask);
      break;
      case 2:
        tasks.getAllTask();
      break;
      case 3:
        tasks.getCompletedOrPending();
      break;
      case 4:
        tasks.getCompletedOrPending(false);
      break;
      case 5:
        const ids = await updateATask(tasks.listTask);
        tasks.toggleTaskState(ids);
      break;
      case 6:
        const id = await deleteATask(tasks.listTask);
        if(id!==0){
          const confirmDelete = await confirmMsg(`Are you sure to delete the task ${ tasks._list[id].name }`);
          if(confirmDelete) tasks.deleteATask(id);
        };
      break;
    }

    if(opt !== 0) await pause();

  }while(opt!==0);
};

main();