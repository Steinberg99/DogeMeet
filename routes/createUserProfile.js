const express = require('express');
const { globalAgent } = require('http');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/createUserProfile', async (req, res) => {
    try {
      res.render('createUserProfile');
    } catch (error) {
      console.log(error);
    }
  });

router.post("/createUserProfile", async (req, res) => {
    try {
    // Get the database conncection
    database = req.app.get('database');

    let userProfile = {
        _id: '500691074',
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    const output = `
    <img src="cid:banner"/>
    <h1>Hello ${req.body.name},</h1>
    <h3> Thanks for joining us! Are you ready to meet the most adorable dogs? </h3>
    <p> These are your credentials to login, in case you forget. </p>
    <p>Name: ${req.body.name}</p>
    <p>Email: ${req.body.email}</p>
    <p>Password: ${req.body.password}</p>
    `
    ;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_ADRESS, 
            pass: process.env.EMAIL_PASSWORD
        }
          });
        
          let mailOptions = {
              from: '"DogeMeet team" <dogemeetapp@gmail.com>', //sender
              to: req.body.email, // receiver
              subject: 'Welcome to Dogemeet!', //subject line
              text: 'doggo',
              html: output,//plain text body
              attachments: [{
                filename: 'banner',
                path: './static/public/images/dogemail.png',
                cid: 'banner' //same cid value as in the html img src
            }]
          };

    const result = await database.collection('users').insertOne(userProfile);
    console.log(userProfile);
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
        console.log("Message sent: %s", info.messageId);
      }
    });

} catch (error) {
    console.error(error);

  } finally {
    res.render('createUserProfile');
  }
});

// Export the router
module.exports = router;