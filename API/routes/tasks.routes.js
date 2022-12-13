const { Router } = require("express");
const { getTasks, deleteTasks, createTask, updateTask } = require("../controllers/tasks.controllers");

const router  = Router();

router.get("/api/v1/",getTasks);
router.post("/api/v1/",createTask);
router.put("/api/v1/:id",updateTask);
router.delete("/api/v1/:id",deleteTasks);

module.exports = router;