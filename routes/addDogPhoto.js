const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.get('/addDogPhoto', async (req, res) => {
    try {
      res.render('addDogPhoto');
    } catch (error) {
      console.log(error);
    }
  });

// Export the router
module.exports = router;