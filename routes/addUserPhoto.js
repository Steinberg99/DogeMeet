const express = require('express');
const router = express.Router();
const multer  = require('multer')
const path = require('path');
const storage = multer.diskStorage({
    destination: './static/public/images/uploads',
    filename: function(req, file, cb){
        cb(null,file.fieldname+ path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

router.get('/addUserPhoto', async (req, res) => {
    try {
      res.render('addUserPhoto');
    } catch (error) {
      console.log(error);
    }
  });

  router.post('/addUserPhoto', upload.single('userPhoto'), (req, res) => {
    try {

    } catch(error) {
        console.log(error);
    } finally {
        res.render('createDogProfile');
      }
  });

// Export the router
module.exports = router;