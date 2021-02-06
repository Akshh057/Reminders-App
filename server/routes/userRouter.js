const express = require("express");
/* import { getUser } from '../controllers/userRoute.js' */
const router = new express.Router();
const {
  loginUser,
  loggedUser,
  registerUser,
  updateUser,
  deleteUser,
  tokenIsValid,
  newReminder,
  fetchReminder,
  deleteReminder,
  updateReminder,
  feedback,
} = require("../controllers/userRoute");
const auth = require("../middleware/auth");

/* router.get('/', getUser) = router.get('/user', getUser) */
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/tokenIsValid", tokenIsValid);
router.post("/newReminder", newReminder);
router.post('/feedback', feedback);

/* Private Route, Logged in Users can access it*/
router.get("/", auth, loggedUser)
router.get("/fetchReminder", auth, fetchReminder)
router.patch("/", auth, updateUser);
router.delete("/", auth, deleteUser);
router.delete("/deleteReminder", auth, deleteReminder);
router.patch("/updateReminder", auth, updateReminder);


module.exports = router;
