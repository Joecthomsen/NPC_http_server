var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.status(200).json({"This is a test": "This is a test"});
});

router.post('/', (req, res, next) => {
  const { email, password } = req.body;
  if(!email || !password) {
    return res.status(400).json({"error": "All fields are required"});
  }
  console.log(email, password);
  res.status(200).json({"email": email, "password": password});
})

module.exports = router;
