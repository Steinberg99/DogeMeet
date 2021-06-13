const express = require('express');
const router = express.Router();

router.get('/addUserPhoto', async (req, res) => {
    try {
      res.render('addUserPhoto');
    } catch (error) {
      console.log(error);
    }
  });

// Export the router
module.exports = router;