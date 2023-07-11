const database = require("../database/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async ({ username, password, email, name }) => {
  console.log("[register]");
  try {
    const isUserRegistered = await database.executeQuery(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (isUserRegistered?.length > 0) {
      return "User already exists";
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await database.executeQuery(
      "INSERT INTO users (username, password, email, name) VALUES (?, ?, ?, ?)",
      [username, hashedPassword, email, name]
    );
    return "User registered successfully";
  } catch (err) {
    console.log("Error in register: ", err);
    throw new Error(err);
  }
};

const login = async ({ email, password }) => {
  console.log("[login]");
  try {
    const result = await database.executeQuery(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (result.length === 0) {
      return "User not found";
    }
    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return "Invalid credentials";
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRETKEY, {
      expiresIn: "1h",
    });

    return token;
  } catch (err) {
    console.log("Error in login: ", err);
    throw new Error(err);
  }
};

const update = async (username, email, name, userId) => {
  console.log("[update]");
  try {
    await database.executeQuery(
      "UPDATE users SET username = ?, email = ?, name = ? WHERE id = ?",
      [username, email, name, userId]
    );
    return "User profile updated successfully";
  } catch (err) {
    console.log("Error in update: ", err);
    throw new Error(err);
  }
};

const deleteUser = async (userId) => {
  console.log("[deleteUser]");
  try {
    await database.executeQuery("DELETE FROM users WHERE id = ?", [userId]);
    return "User profile deleted successfully";
  } catch (err) {
    console.log("Error in deleteUser: ", err);
    throw new Error(err);
  }
};

module.exports = {
  register: register,
  login: login,
  update: update,
  deleteUser: deleteUser,
};
