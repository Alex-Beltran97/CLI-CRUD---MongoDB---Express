const axios = require("axios");
require("dotenv").config();

const instance = () => axios.create({
  baseURL: process.env.BASE_URL
});

const methods = {
  get: ()=>instance().get(),
  post: (data)=>instance().post("/",data),
  put: (id)=>instance().put("/"+id),
  delete: (id)=>instance().delete("/"+id),
};

module.exports = methods;