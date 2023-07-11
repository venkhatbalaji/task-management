const database = require("../database/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (title, description, dueDate, assignedBy) => {
  console.log("[register]");
  try {
    await database.executeQuery(
      "INSERT INTO tasks (title, description, due_date, assigned_by) VALUES (?, ?, ?, ?)",
      [title, description, dueDate, assignedBy]
    );
    return "Task registered successfully";
  } catch (err) {
    console.log("Error in register: ", err);
    throw new Error(err);
  }
};

const assign = async (taskId, assignedTo, assignedBy) => {
  console.log("[login]");
  try {
    const [result] = await database.executeQuery(
      "UPDATE tasks SET assigned_to = ? WHERE id = ? AND assigned_by = ?",
      [assignedTo, taskId, assignedBy]
    );
    if (result.affectedRows === 0) {
      return "Task not found or unauthorized";
    }
    return "Task assigned successfully";
  } catch (err) {
    console.log("Error in login: ", err);
    throw new Error(err);
  }
};

const complete = async (taskId, userId) => {
  console.log("[complete]");
  try {
    const [result] = await database.executeQuery(
      "UPDATE tasks SET completed = true WHERE id = ? AND (assigned_to = ? OR assigned_by = ?)",
      [taskId, userId, userId]
    );
    if (result.affectedRows === 0) {
      return "Task not found or unauthorized";
    }
    return "Task marked as completed";
  } catch (err) {
    console.log("Error in update: ", err);
    throw new Error(err);
  }
};

const getAssignedByMe = async (userId) => {
  console.log("[getAssignedByMe]");
  try {
    const assignedTasks = await database.executeQuery(
      "SELECT * FROM tasks WHERE assigned_by = ?",
      [userId]
    );
    return assignedTasks;
  } catch (err) {
    console.log("Error in getAssignedByMe: ", err);
    throw new Error(err);
  }
};

const getAssignedToMe = async (userId) => {
  console.log("[getAssignedToMe]");
  try {
    const assignedTasks = await database.executeQuery(
      "SELECT * FROM tasks WHERE assigned_to = ?",
      [userId]
    );
    return assignedTasks;
  } catch (err) {
    console.log("Error in getAssignedToMe: ", err);
    throw new Error(err);
  }
};

const getTaskStatistics = async () => {
  console.log("[getTaskStatistics]");
  try {
    const tasks = await database.executeQuery(
      `SELECT users.username, COUNT(tasks.id) AS total_tasks, AVG(TIMESTAMPDIFF(SECOND, tasks.created_at, tasks.completed_at)) AS avg_completion_time
      FROM users
      LEFT JOIN tasks ON users.id = tasks.assigned_to
      WHERE tasks.completed = true
      GROUP BY users.id`
    );
    return tasks;
  } catch (err) {
    console.log("Error in getTaskStatistics: ", err);
    throw new Error(err);
  }
};

const getTasktimeline = async () => {
  console.log("[getTasktimeline]");
  try {
    const tasks = await database.executeQuery(
      `SELECT MONTHNAME(completed_at) AS month, COUNT(id) AS tasks_completed
      FROM tasks
      WHERE completed = true
      GROUP BY MONTH(completed_at)
      ORDER BY MONTH(completed_at)`
    );
    return tasks;
  } catch (err) {
    console.log("Error in getTasktimeline: ", err);
    throw new Error(err);
  }
};

module.exports = {
  register: register,
  assign: assign,
  complete: complete,
  getAssignedByMe: getAssignedByMe,
  getAssignedToMe: getAssignedToMe,
  getTaskStatistics: getTaskStatistics,
  getTasktimeline: getTasktimeline,
};
