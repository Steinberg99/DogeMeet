const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', {
    doggo: undefined,
    location: undefined
  });
});

module.exports = router;
