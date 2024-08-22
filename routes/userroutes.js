const express = require("express");
const {
  registerUser,
  loginUser,
  getallUser,
  getSingleUser,
  deletUser,
  updateUser,
} = require("../controllers/usercontroller");
const upload = require("../middleware/filehandling");

const router = express.Router();

router.post("/register", upload.single("profile_picture"), registerUser);
router.post("/login", loginUser);
router.post("/users", getallUser);
router.get("/users/:id", getSingleUser);
router.delete("/users/:id", deletUser);
router.put("/user/:id", upload.single("profile_picture"), updateUser);

module.exports = router;
