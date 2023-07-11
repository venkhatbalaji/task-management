const mysql = require("mysql2");
let connection;

// Function to initialize the database connection
const initialize = async () => {
  console.log("Initializing...");
  connection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    port: process.env.MYSQLPORT,
  });

  try {
    await connection
      .promise()
      .query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQLDATABASE}`);
    console.log("Database created or already exists.");
    connection = mysql.createConnection({
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      port: process.env.MYSQLPORT,
    });
    await connection.connect();
    console.log("Database Connected!");
  } catch (error) {
    console.log("Error in database connection:", error);
  }
};

// Function to execute a SQL query
const query = async (queryString, params) => {
  if (!connection) {
    await initialize();
  }

  try {
    console.log(queryString, params);
    const [rows] = await connection.promise().query(queryString, params);
    console.log("Fetched rows:", rows);
    return rows;
  } catch (error) {
    console.log("Error in query execution:", error);
    throw error;
  }
};

// Function to check if a table exists
async function tableExists(tableName) {
  const selectquery = `SELECT COUNT(*) as count FROM information_schema.TABLES WHERE table_schema = '${process.env.MYSQLDATABASE}' AND table_name = '${tableName}'`;
  return await query(selectquery).then((results) => results[0].count > 0);
}

// Create users table
const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  email VARCHAR(255),
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

// Create tasks table
const createTasksTableQuery = `
CREATE TABLE IF NOT EXISTS tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  description TEXT,
  due_date DATE,
  assigned_to INT,
  assigned_by INT,
  completed BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (assigned_to) REFERENCES users(id),
  FOREIGN KEY (assigned_by) REFERENCES users(id)
)`;

// Create task_completions table
const createTaskCompletionsTableQuery = `
CREATE TABLE IF NOT EXISTS task_completions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  task_id INT,
  user_id INT,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (task_id) REFERENCES tasks(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
)`;

// Create task_timeline table
const createTaskTimelineTableQuery = `
CREATE TABLE IF NOT EXISTS task_timeline (
  id INT PRIMARY KEY AUTO_INCREMENT,
  month INT,
  year INT,
  task_count INT
)`;

// Function to create the necessary tables
async function createTablesIfNotExists() {
  try {
    const usersTableExists = await tableExists("users");
    const tasksTableExists = await tableExists("tasks");
    const taskCompletionsTableExists = await tableExists("task_completions");
    const taskTimelineTableExists = await tableExists("task_timeline");
    if (!usersTableExists) {
      await query(createUsersTableQuery);
      console.log("Users table created successfully.");
    }
    if (!tasksTableExists) {
      await query(createTasksTableQuery);
      console.log("Tasks table created successfully.");
    }
    if (!taskCompletionsTableExists) {
      await query(createTaskCompletionsTableQuery);
      console.log("Task completions table created successfully.");
    }
    if (!taskTimelineTableExists) {
      await query(createTaskTimelineTableQuery);
      console.log("Task timeline table created successfully.");
    }
    console.log("All tables are up to date.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

module.exports = {
  createTables: createTablesIfNotExists,
  executeQuery: query,
  initialize: initialize,
};
