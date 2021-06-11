const { ObjectId } = require('mongodb')
const express = require('express');
const router = express.Router();
require('dotenv').config();

let database;
let doggos;
let doggo;

router.get('/', async (req, res) => {
  try {
    // Get the database conncection
    database = req.app.get('database');
    const user = await database.collection('users').findOne({ _id: ObjectId(process.env.USER_ID) });
    let lastQuery = {};
    if(Object.keys(user.last_query).length !== 0) { 
      lastQuery = getQuery(user.last_query);
    }

    doggo = undefined;
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

    doggo = undefined;
    let location = undefined;

    await database
      .collection('users')
      .updateOne({ _id: ObjectId(process.env.USER_ID) }, { $set: { last_query: req.body } });

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

router.post('/like', async (req, res) => {
  try {
    // Get the database conncection
    database = req.app.get('database');

    // Get the current user
    const user = await database.collection('users').findOne({ _id: ObjectId(process.env.USER_ID) });

    // Save the id when a doggo is liked or disliked
    if (req.body.skip) {
      await database
        .collection('users')
        .updateOne({ _id: ObjectId(process.env.USER_ID) }, { $push: { disliked_doggos: doggo.id } }); // Dislike
    } else {
      await database
        .collection('users')
        .updateOne({ _id: ObjectId(process.env.USER_ID) }, { $push: { liked_doggos: doggo.id } }); // Like
     
      // Get the owner of the current dog
      const owner = await database.collection('users').findOne({ _id: ObjectId(doggo.owner) });

      // Get every user that has like me / is a potential match
      const myPotentialMatches = user.potential_matches.toString()
    
      // If the dog owner is in my potential matches
      if (myPotentialMatches.includes(owner._id)) {
        // Then add his dog to my matched doggos
        await database
        .collection('users')
        .updateOne({ _id: ObjectId(user._id) }, { $push: { matched_doggos: doggo.id } });

        // And add my dog to his matched doggos
        await database
        .collection('users')
        .updateOne({ _id: ObjectId(owner._id) }, { $push: { matched_doggos: user.doggo_id } });
        
      }
      // Has the dog owner not liked me yet?
      else {
        // Then add my user id to his potential matches
        await database
        .collection('users')
        .updateOne({ _id: ObjectId(owner._id) }, { $push: { potential_matches: user._id } });
      }
    }

    // Get the next doggo
    doggo = getNextDoggo();
    if (doggo) {
      location = await database
        .collection('locations')
        .findOne({ id: doggo.location_id });
    } else {
      location = undefined;
    }

    res.render('home', {
      doggo: doggo,
      location: location
    });

    // Redirect zodat in de URL niet de post blijft hangen
    // res.redirect('/')
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
  const user = await database.collection('users').findOne({ _id: ObjectId(process.env.USER_ID) });
  doggos = doggos.filter(
    doggo =>
      !user.liked_doggos.includes(doggo.id) &&
      !user.disliked_doggos.includes(doggo.id)
  );
}

function getNextDoggo() {
  for (let i = 1; i < doggos.length; i++) {
    if (doggo == doggos[i - 1]) {
      return doggos[i];
    }
  }
  return undefined;
}

// Export the router
module.exports = router;