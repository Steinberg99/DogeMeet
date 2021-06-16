const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: './static/public/images/uploads' })

router.get('/addUserPhoto', async (req, res) => {
    try {
      res.render('addUserPhoto');
    } catch (error) {
      console.log(error);
    }
  });

  router.post('/addUserPhoto', upload.single('userPhoto'), (req, res) => {
    try {
      res.send(req.file);
    } catch(error) {
        console.log(error);
    } finally {
        res.render('createDogProfile');
      }
  });

// Export the router
module.exports = router;