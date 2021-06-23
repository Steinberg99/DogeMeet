const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: './static/public/images/uploads',
    filename: function(req, file, cb){
        cb(null,file.fieldname+ path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

router.get('/addDogPhoto', async (req, res) => {
    try {
      res.render('fullProfile');
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