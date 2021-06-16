const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: './static/public/images/uploads' })

router.get('/addDogPhoto', async (req, res) => {
    try {
      res.render('addDogPhoto');
    } catch (error) {
      console.log(error);
    }
  });

  router.post('/addDogPhoto', upload.single('dogPhoto'), (req, res) => {
    try {
      res.send(req.file);
    } catch(error) {
        console.log(error);
    } finally {
        res.render('fullProfile');
      }
  });

// Export the router
module.exports = router;