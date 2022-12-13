const { v4: uuidv4 } = require("uuid");

class Task {
  id;
  name;
  completedAt = null;

  constructor(name){
    this.id = uuidv4();
    this.name = name;
  };
};

module.exports = Task;