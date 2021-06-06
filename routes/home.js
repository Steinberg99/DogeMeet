const express = require('express');
const router = express.Router();

let database;
let doggos;

router.get('/', async (req, res) => {
  try {
    // Get the database conncection
    database = req.app.get('database');
    let user = await database.collection('users').findOne({ id: 1 });
    let lastQuery = getQuery(user.last_query);

    let doggo = undefined;
    let location = undefined;

    doggos = await database.collection('doggos').find(lastQuery, {}).toArray();
    await filterLikedDoggos();

    if (doggos[0]) {
      doggo = doggos[0];
      location = await database
        .collection('locations')
        .findOne({ id: doggo.location_id });
    }

    res.render('home', {
      doggo: doggo,
      location: location
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/search-result', async (req, res) => {
  try {
    // Get the database conncection
    database = req.app.get('database');
    let query = getQuery(req.body);

    let doggo = undefined;
    let location = undefined;

    await database
      .collection('users')
      .updateOne({ id: 1 }, { $set: { last_query: req.body } });

    doggos = await database.collection('doggos').find(query, {}).toArray();
    await filterLikedDoggos();

    if (doggos[0]) {
      doggo = doggos[0];
      location = await database
        .collection('locations')
        .findOne({ id: doggo.location_id });
    }

    res.render('home', {
      doggo: doggo,
      location: location
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/like', (req, res) => {
  try {
    // Get the database conncection
    database = req.app.get('database');

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

function getQuery(params) {
  let selectedLocationIds = params.location_ids.map(id => parseInt(id, 10));
  return {
    age: { $gt: 0, $lt: parseInt(params.age, 10) },
    doggo_vibe: { $in: params.doggo_vibes },
    location_id: { $in: selectedLocationIds }
  };
}

async function filterLikedDoggos() {
  let user = await database.collection('users').findOne({ id: 1 });
  doggos = doggos.filter(
    doggo =>
      !user.liked_doggos.includes(doggo.id) &&
      !user.disliked_doggos.includes(doggo.id)
  );
  console.log(doggos);
}

// Export the router
module.exports = router;
