const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
require('dotenv').config();

let database;

const chatLog = {
  doggo_ids: ['60bcc8bc9d28f5ae1a2fca2a', '60bcc8bc9d28f5ae1a2fca2b'],
  messages: [
    {
      sender_id: '60bcc8bc9d28f5ae1a2fca2a',
      content: 'Hi! How r u today! Scooby is very cute :)',
      date: new Date()
    },
    {
      sender_id: '60bcc8bc9d28f5ae1a2fca2b',
      content: 'I am good, wbu?',
      date: new Date()
    },
    {
      sender_id: '60bcc8bc9d28f5ae1a2fca2b',
      content: 'Thank you! He is a good boy :)',
      date: new Date()
    },
    {
      sender_id: '60bcc8bc9d28f5ae1a2fca2b',
      content: '???',
      date: new Date('2021-6-10')
    },
    {
      sender_id: '60bcc8bc9d28f5ae1a2fca2a',
      content: 'Sorry was eating a pizza.',
      date: new Date('2021-12-25')
    },
    {
      sender_id: '60bcc8bc9d28f5ae1a2fca2b',
      content: 'Must have been a big pizza...',
      date: new Date('2021-12-26')
    },
    {
      sender_id: '60bcc8bc9d28f5ae1a2fca2b',
      content: 'Pepperoni?',
      date: new Date('2021-12-26')
    },
    {
      sender_id: '60bcc8bc9d28f5ae1a2fca2a',
      content: 'No pineapple.',
      date: new Date('2021-12-27')
    },
    {
      sender_id: '60bcc8bc9d28f5ae1a2fca2b',
      content: 'Ok, this conversation is officialy over. Goodbye.',
      date: new Date('2021-12-28')
    }
  ]
};

router.get('/chat/:recieverDoggoId', async (req, res) => {
  try {
    // Get the database connection
    database = req.app.get('database');

    // Get the user data
    let user = await database
      .collection('users')
      .findOne({ _id: ObjectId(process.env.USER_ID) });

    // Get the reciever doggo
    let recieverDoggo = await database
      .collection('doggos')
      .findOne({ _id: ObjectId(req.params.recieverDoggoId) });

    // Render the chat page
    res.render('chat', {
      recieverDoggo: recieverDoggo,
      chatLog: chatLog,
      getDateString: getDateString,
      compareDates: compareDates
    });
  } catch (error) {
    console.log(error);
  }
});

function getDateString(date) {
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  let month = months[date.getMonth()];
  let day = date.getDate();
  let minutes = date.getMinutes().toString();
  if (minutes.length == 1) {
    minutes = '0' + minutes;
  }
  let hours = date.getHours().toString();
  if (hours.length == 1) {
    hours = '0' + hours;
  }
  return `${month} ${day}, ${hours}:${minutes}`;
}

function compareDates(firstDate, secondDate) {
  let diffMs = Math.abs(firstDate - secondDate);
  let diffMins = Math.floor(diffMs / 1000 / 60);
  return diffMins >= 10;
}

// Export the router
module.exports = router;
