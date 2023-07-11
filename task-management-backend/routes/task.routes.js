const { body } = require("express-validator");
const taskController = require("../controller/task.controller");
const middleware = require("../middleware/user.middleware");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/tasks",
    [
      body("title").notEmpty(),
      body("description").notEmpty(),
      body("dueDate").notEmpty(),
      middleware.authenticateToken,
    ],
    taskController.register
  );
  app.put(
    "/tasks/:taskId/assign",
    middleware.authenticateToken,
    taskController.assign
  );
  app.put(
    "/tasks/:taskId/complete",
    middleware.authenticateToken,
    taskController.complete
  );
  app.get(
    "/tasks/assigned-to-me",
    middleware.authenticateToken,
    taskController.assignedToMe
  );
  app.get(
    "/tasks/assigned-by-me",
    middleware.authenticateToken,
    taskController.assignedByMe
  );
  app.get("/task-statistics", taskController.getTaskStatistics);
  app.get("/task-timeline", taskController.getTasktimeline);
};
