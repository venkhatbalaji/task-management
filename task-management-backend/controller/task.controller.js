const { validationResult } = require("express-validator");
const taskService = require("../service/task.service");

const register = async (req, res) => {
  console.log("[register User]");
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, dueDate } = req.body;
    const assignedBy = req.user.id;
    const data = await taskService.register(
      title,
      description,
      dueDate,
      assignedBy
    );
    return res.status(201).send({
      success: true,
      message: data,
    });
  } catch (error) {
    console.log("error in [register User]", error);
    return res.status(500).send({
      message: "Error in register",
      success: false,
    });
  }
};

const assign = async (req, res) => {
  console.log("[assign User]");
  try {
    const taskId = parseInt(req.params.taskId);
    const assignedTo = parseInt(req.body.assignedTo);
    const assignedBy = req.user.id;
    const data = await taskService.assign(taskId, assignedTo, assignedBy);
    return res.status(201).send({
      success: true,
      message: data,
    });
  } catch (error) {
    console.log("error in [assign User]", error);
    return res.status(500).send({
      message: "Error in assign",
      success: false,
    });
  }
};

const complete = async (req, res) => {
  console.log("[complete Task]");
  try {
    const taskId = parseInt(req.params.taskId);
    const userId = req.user.id;
    const data = await taskService.complete(taskId, userId);
    return res.status(201).send({
      success: true,
      message: data,
    });
  } catch (error) {
    console.log("error in [complete Task]", error);
    return res.status(500).send({
      message: "Error in complete task",
      success: false,
    });
  }
};

const assignedByMe = async (req, res) => {
  console.log("[assignedByMe Task]");
  try {
    const userId = req.user.id;
    const data = await taskService.getAssignedByMe(userId);
    return res.status(201).send({
      success: true,
      tasks: data,
    });
  } catch (error) {
    console.log("error in [assignedByMe Task]", error);
    return res.status(500).send({
      message: "Error in assignedByMe Task",
      success: false,
    });
  }
};

const assignedToMe = async (req, res) => {
  console.log("[assignedToMe Task]");
  try {
    const userId = req.user.id;
    const data = await taskService.getAssignedToMe(userId);
    return res.status(201).send({
      success: true,
      tasks: data,
    });
  } catch (error) {
    console.log("error in [assignedToMe Task]", error);
    return res.status(500).send({
      message: "Error in assignedToMe Task",
      success: false,
    });
  }
};

const getTaskStatistics = async (req, res) => {
  console.log("[getTaskStatistics]");
  try {
    const data = await taskService.getTaskStatistics(userId);
    return res.status(201).send({
      success: true,
      tasks: data,
    });
  } catch (error) {
    console.log("error in [getTaskStatistics]", error);
    return res.status(500).send({
      message: "Error in getTaskStatistics",
      success: false,
    });
  }
};

const getTasktimeline = async (req, res) => {
  console.log("[getTasktimeline]");
  try {
    const data = await taskService.getTasktimeline(userId);
    return res.status(201).send({
      success: true,
      tasks: data,
    });
  } catch (error) {
    console.log("error in [getTasktimeline]", error);
    return res.status(500).send({
      message: "Error in getTasktimeline",
      success: false,
    });
  }
};

module.exports = {
  register: register,
  assign: assign,
  complete: complete,
  assignedByMe: assignedByMe,
  assignedToMe: assignedToMe,
  getTaskStatistics: getTaskStatistics,
  getTasktimeline: getTasktimeline,
};
