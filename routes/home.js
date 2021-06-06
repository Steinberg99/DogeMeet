const express = require('express');
const router = express.Router();
let doggos;

router.get('/', (req, res) => {
  try {
    // Get the database conncection
    let database = req.app.get('database');

    // TODO:
    // - Get the doggos with the last query
    // - Render the first doggo or the empty state

    res.render('home', {
      doggo: undefined,
      location: undefined
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/search-results', async (req, res) => {
  try {
    // Get the database conncection
    let database = req.app.get('database');

    // TODO:
    // - Save req body
    // - Get the doggos
    // - Render the first doggo or the empty state

    res.render('home', {
      doggo: undefined,
      location: undefined
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/like', (req, res) => {
  try {
    // Get the database conncection
    let database = req.app.get('database');

    // TODO:
    // - Save liked or disliked doggo id
    // - Render the next doggo or the empty state

    res.render('home', {
      doggo: undefined,
      location: undefined
    });
  } catch (error) {
    console.log(error);
  }
});

// Export the router
module.exports = router;
