const express = require('express');
const router = express.Router();

router.get('/fullProfile', async (req, res) => {
    try {
      res.render('fullProfile');
    } catch (error) {
      console.log(error);
    }
  });

// Export the router
module.exports = router;