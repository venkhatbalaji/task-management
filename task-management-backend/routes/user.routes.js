const { body } = require("express-validator");
const userController = require("../controller/user.controller");
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
    "/register",
    [
      body("username").notEmpty(),
      body("password").isLength({ min: 6 }),
      body("email").isEmail(),
      body("name").notEmpty(),
    ],
    userController.register
  );
  app.post(
    "/login",
    [body("password").isLength({ min: 6 }), body("email").isEmail()],
    userController.login
  );
  app.put(
    "/profile",
    [
      body("username").notEmpty(),
      body("email").isEmail(),
      body("name").notEmpty(),
      middleware.authenticateToken,
    ],
    userController.login
  );
  app.delete("/account", middleware.authenticateToken, userController.deleteUser);
};
