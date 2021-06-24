const express = require('express');
const { file } = require('googleapis/build/src/apis/file');
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
        console.log (req.file)
        res.render('createDogProfile', {
          file: req.file.originalname
        });
      
  });

// Export the router
module.exports = router;