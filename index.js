const express = require('express');
const { MongoClient } = require('mongodb');
const http = require('http');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 4200;
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// Establish connection to MongoDB database
let database;
async function connectDatabase() {
  let client = new MongoClient(process.env.DB_URI, {
    retryWrites: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  try {
    await client.connect();
    database = client.db(process.env.DB_NAME);
    // Set the database connection.
    app.set('database', database);
  } catch (error) {
    console.log(error);
  }
}

app.set('view engine', 'pug');
app.use(express.static('static'));
app.use(express.urlencoded());

const homeRouter = require('./routes/home.js');
const searchRouter = require('./routes/search.js');
const profileRouter = require('./routes/profile.js');
const matchesRouter = require('./routes/matches.js');
const chatRouter = require('./routes/chat.js');
app.use('/', homeRouter); // Homepage route
app.use('/', searchRouter); // Search route
app.use('/', profileRouter); // Profile route
app.use('/', matchesRouter); // Matches route
app.use('/', chatRouter); // Chat route

app.use((req, res) => {
  res.status(404).send('Error 404');
});

io.on('connection', socket => {
  console.log('A user connected');
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  connectDatabase().then(() => {
    console.log('Connected to MongoDB');
  });
});
