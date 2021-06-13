const express = require('express');
const router = express.Router();

router.get('/createDogProfile', async (req, res) => {
    try {
      res.render('createDogProfile');
    } catch (error) {
      console.log(error);
    }
  });

// Export the router
module.exports = router;