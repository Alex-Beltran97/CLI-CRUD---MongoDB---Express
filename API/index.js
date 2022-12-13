const express = require("express");
const morgan = require("morgan");
const tasksRouter = require("./routes/tasks.routes");
const { mongoose } = require("./models/schemas");
require("dotenv").config();

const PORT = 3005;
const app = express();

app.use(morgan('dev'));
app.use(express.json());

mongoose.set('strictQuery', true);

mongoose.connect(process.env.DB_CONNECTION,(error)=>{
  if(error){ 
    console.log("Error with DB Connection");
    return 
  };

  console.log("MongoDB Connected!");
});


app.listen(PORT,()=>{
  console.log(`Connected in port http://localhost:${ PORT }`);
});

app.use(tasksRouter);