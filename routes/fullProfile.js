const express = require('express');
const router = express.Router();

  router.get("/fullProfile",  async (req, res) => {
    let getProfile = null;
    const userInfo = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    let dogInfo = {
        name: req.body.name,
        age: req.body.age,
        breed: req.body.breed,
        description: req.body.description,
        vibe: req.body.vibe,
        location: req.body.location
    };
try {  
      // Get the database connection
    database = req.app.get('database');
    const userQuery = { _id: '500691074'};
    getProfile = await database.collection('users').findOne(userQuery);
    
    const dogQuery = { doggoId: '10'};
    getDogProfile = await database.collection('doggos').findOne(dogQuery);
    
    console.log(getProfile)
    console.log(getDogProfile)

} catch (error) {
    console.error(error);

    } finally {
    res.render('fullProfile', {
        userInfo:getProfile,
        dogInfo:getDogProfile
        });
    }
});

router.post('/mail', async (req, res) => {
    // Get the database conncection
    database = req.app.get('database');
        
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_ADRESS, 
            pass: process.env.EMAIL_PASSWORD
        }
          });
        
          let mailOptions = {
              from: '"DogeMeet team" <dogemeetapp@gmail.com>', //sender
              to:'nataschazwolsman@hotmail.com', // receiver
              subject: 'Welcome to Dogemeet', //subject line
              text: `hello ${userInfo.name}!
              
              Thanks for signing up with us. ` //plain text body
          };
        
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              } else {
              console.log("Message sent: %s", info.messageId);
              console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
              res.render('mail');
            }
          });
   
  });

// Export the router
module.exports = router;