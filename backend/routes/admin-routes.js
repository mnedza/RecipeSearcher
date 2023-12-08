const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin-controller");

router.get("/users", adminController.getAllUsers);
router.get("/users/:userId", adminController.getUser);

router.post("/users/add-user", adminController.addUser);
router.delete("/users", adminController.removeUser);

module.exports = router;
