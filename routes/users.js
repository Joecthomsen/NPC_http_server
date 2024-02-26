var express = require("express");
var router = express.Router();

const User = require("../schemas/userSchema");

/* GET users listing. */
router.get("/", function (req, res, next) {
  //res.send('respond with a resource');
  res.status(200).json({ "This is a test": "This is a test" });
});

router.get("/:email", async (req, res, next) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json(user);
});

router.post("/create", async (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: "All fields are required" });
  }
  console.log(email, password, name);

  const user = await User.create({ email, password, name });
  if (!user) {
    return res.status(400).json({ error: "User not created" });
  }
  res.status(200).json({ email: email, name: name });
});

module.exports = router;
