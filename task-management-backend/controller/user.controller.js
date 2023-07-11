const { validationResult } = require("express-validator");
const userService = require("../service/user.service");

const register = async (req, res) => {
  console.log("[register User]");
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = await userService.register(req.body);
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

const login = async (req, res) => {
  console.log("[login User]");
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = await userService.login(req.body);
    return res.status(201).send({
      success: true,
      token: data,
    });
  } catch (error) {
    console.log("error in [login User]", error);
    return res.status(500).send({
      message: "Error in login",
      success: false,
    });
  }
};

const update = async (req, res) => {
  console.log("[update User]");
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, name } = req.body;
    const userId = req.user.id;
    const data = await userService.update(username, email, name, userId);
    return res.status(201).send({
      success: true,
      message: data,
    });
  } catch (error) {
    console.log("error in [update User]", error);
    return res.status(500).send({
      message: "Error in update",
      success: false,
    });
  }
};

const deleteUser = async (req, res) => {
  console.log("[delete User]");
  try {
    const userId = req.user.id;
    const data = await userService.deleteUser(userId);
    return res.status(201).send({
      success: true,
      message: data,
    });
  } catch (error) {
    console.log("error in [delete User]", error);
    return res.status(500).send({
      message: "Error in delete",
      success: false,
    });
  }
};

module.exports = {
  register: register,
  login: login,
  update: update,
  deleteUser: deleteUser,
};
