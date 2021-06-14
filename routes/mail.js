const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/mail', async (req, res) => {
    try {
      res.render('mail');
    } catch (error) {
      console.log(error);
    }
  });

  router.post('/mail', async (req, res) => {
    // Get the database conncection
    database = req.app.get('database');
    
    let userEmail 

    const emailUser = await database.collection('users').findOne(userEmail);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADRESS, 
            pass: process.env.EMAIL_PASSWORD
        }
          });
        
          let mailOptions = {
              from: '"DogeMeet team" <dogemeetapp@gmail.com>', //sender
              to: 'natascha.zwolsman@hva.nl', // receiver
              subject: 'Welcome to Dogemeet', //subject line
              text: 'hello', //plain text body
              html: '<h1>hello</h1>' // vervangen met tekst
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