const express = require("express");
const { fetchUserById, updateUser } = require("../controller/User");

const router = express.Router();

router.get("/own", fetchUserById); // Route for fetching user by ID
router.patch("/:id", updateUser); // Route for updating user by ID

module.exports = { router };
