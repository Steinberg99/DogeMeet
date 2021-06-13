const express = require('express');
const router = express.Router();

router.get('/createUserProfile', async (req, res) => {
    try {
      res.render('addUserProfile');
    } catch (error) {
      console.log(error);
    }
  });

// Export the router
module.exports = router;