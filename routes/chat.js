const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
require('dotenv').config();

let database;

const chat_log_example = {
  doggo_ids: ['60bcc8bc9d28f5ae1a2fca2a', '60bcc8bc9d28f5ae1a2fca2b'],
  messages: [
    {
      sender_id: '60bcc8bc9d28f5ae1a2fca2a',
      content: 'Hi! How r u today!'
    },
    {
      sender_id: '60bcc8bc9d28f5ae1a2fca2b',
      content: "I'm good, wbu?"
    }
  ]
};

router.get('/chat/', async (req, res) => {
  try {
    database = req.app.get('database');

    res.render('chat', {});
  } catch (error) {
    console.log(error);
  }
});

// Export the router
module.exports = router;
