const express = require('express');
const app = express();

const port = process.env.PORT || 4200;

app.set('view engine', 'pug');

app.use(express.static('static'));
app.use(express.urlencoded());

const homeRouter = require('./routes/home.js');
const searchRouter = require('./routes/search.js');
const likedRouter = require('./routes/liked.js');
const profileRoute = require('./routes/profile.js');
app.use('/', homeRouter);
app.use('/', searchRouter);
app.use('/', likedRouter);
app.use('/', profileRoute);

app.use((req, res) => {
  res.status(404).send('Error 404');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
