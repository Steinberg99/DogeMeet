const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
require('dotenv').config();

let database;

router.get('/chat/:recieverDoggoId', async (req, res) => {
  try {
    // Get the database connection
    database = req.app.get('database');

    // Get the user
    let user = await database
      .collection('users')
      .findOne({ _id: ObjectId(process.env.USER_ID) });

    // Get the reciever doggo
    let recieverDoggo = await database
      .collection('doggos')
      .findOne({ _id: ObjectId(req.params.recieverDoggoId) });

    // Get the chat logs
    let chatLogs = await database.collection('chat_logs').findOne({
      doggo_ids: { $all: [req.params.recieverDoggoId, user.doggo_id] }
    });

    // Render the chat page
    res.render('chat', {
      recieverDoggo: recieverDoggo,
      senderId: user.doggo_id,
      chatLog: chatLogs,
      getDateString: getDateString,
      compareDates: compareDates
    });
  } catch (error) {
    console.log(error);
  }
});

function getDateString(date) {
  newDate = new Date(date);
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
  let month = months[newDate.getMonth()];
  let day = newDate.getDate();
  let minutes = newDate.getMinutes().toString();
  if (minutes.length == 1) {
    minutes = '0' + minutes;
  }
  let hours = newDate.getHours().toString();
  if (hours.length == 1) {
    hours = '0' + hours;
  }
  return `${month} ${day}, ${hours}:${minutes}`;
}

function compareDates(firstDate, secondDate) {
  newFirstDate = new Date(firstDate);
  newSecondDate = new Date(secondDate);
  let diffMs = Math.abs(newFirstDate - newSecondDate);
  let diffMins = Math.floor(diffMs / 1000 / 60);
  return diffMins >= 10;
}

// Export the router
module.exports = router;
