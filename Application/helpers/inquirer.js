const inquirer = require("inquirer");
const colors = require("colors");
const { showMenuOptions } = require("./options");

const showMenu = async ()=>{
  console.clear();
  console.log("=============".green);
  console.log("TODO App".white);
  console.log("=============".green);

  const menuOpt = [
    {
      type:"list",
      name:"menu",
      message:"Pick any option",
      choices: showMenuOptions
    }
  ];

  const { menu } = await inquirer.prompt(menuOpt);

  return menu;
};

const pause = async ()=>{
  const question = [
    {
      type: "input",
      name: "pause",
      message: `Push ${ "ENTER".green } to continue`
    }
  ]

  const { pause } = await inquirer.prompt(question);

  return pause;
};

const createATask = async () =>{
  const question = [
    {
      type: "input",
      name: "task",
      message: "Set a task name",
      validate:(result)=>{
        if(result.length === 0){
          return "Please set a valid name task"
        };

        return true
      }
    }
  ];

  const { task } = await inquirer.prompt(question);

  return task;
};

const updateATask = async (tasks = []) =>{
  const options = tasks.map( (task,index) =>{
    const idx = `${ index+1 }`.green;
    const { name, completedAt } = task;

    return {
      value: task["_id"],
      name: `${ idx } ${ name }`,
      checked: completedAt? true : false
    };
  });

  const { ids } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "ids",
      message: "Pick an option to delete",
      choices: options
    }
  ]);

  return ids;
};
const deleteATask = async (tasks = []) =>{
  const options = tasks.map( (task,index) =>{
    const idx = `${ index+1 }`.green;
    const { name } = task;

    return {
      value: task["_id"],
      name: `${ idx } ${ name }`
    };
  });

  const { id } = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Pick an option to delete",
      choices: [...options,{ value:0, name: `${ "0.".green } Cancel` }]
    }
  ]);

  return id;
};

const confirmMsg = async (message) =>{
  const question = [
    {
      type:"confirm",
      name: "response",
      message
    }
  ];

  const { response } = await inquirer.prompt(question);

  return response;
};

module.exports = {
  showMenu,
  pause,
  createATask,
  deleteATask,
  confirmMsg,
  updateATask
};