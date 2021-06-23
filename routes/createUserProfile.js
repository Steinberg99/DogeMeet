const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const {google} = require('googleapis');

const client_ID = '860668714825-id1enb85v2n9rap6ukrq95i83v8945av.apps.googleusercontent.com';
const client_SECRET ='qRFYaw8RvGt9-SSRtvuBt-mN';
const redirect_URI = 'https://developers.google.com/oauthplayground';
const refresh_TOKEN = '1//04iWC6veSMu1vCgYIARAAGAQSNwF-L9Ir-bxOKtCuk08JfJdOYe5a03QzpbYzVwLBBPQHRkS94wlqBdYDlf73JYVqOgxXKY6qGwE';

const oAuth2Client = new google.auth.OAuth2(client_ID, client_SECRET, redirect_URI)
oAuth2Client.setCredentials({ refresh_token: refresh_TOKEN })

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
        _id: '01',
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    
    const accessToken = await oAuth2Client.getAccessToken()
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

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_ADRESS, 
            pass: process.env.EMAIL_PASSWORD,
            clientId: client_ID,
            clientSecret: client_SECRET,
            refreshToken: refresh_TOKEN,
            accessToken: accessToken
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

    await database.collection('users').insertOne(userProfile);
    console.log(userProfile);
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
        console.log(`Mail sent to: ${userProfile.email}`);
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