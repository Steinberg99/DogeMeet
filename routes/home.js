const { ObjectId } = require('mongodb');
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

    // Get the current user
    const user = await database
      .collection('users')
      .findOne({ _id: ObjectId(process.env.USER_ID) });

    // Get the database query
    let query;
    // Check if the user has a last query
    if (Object.keys(user.last_query).length !== 0) {
      query = await getQuery(user.last_query);
    } else {
      // Filter the doggos that have been liked, disliked or belong to the owner
      let likedDislikedDoggos = user.liked_doggos.concat(user.disliked_doggos);
      likedDislikedDoggos.push(user.doggo_id);
      query = {
        _id: { $nin: likedDislikedDoggos }
      };
    }

    doggo = undefined;
    let location = undefined;

    // Get the doggos with the previously created query
    doggos = await database.collection('doggos').find(query, {}).toArray();

    // Render the first doggo when the doggo array is not empty
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
    let query = await getQuery(req.body);

    doggo = undefined;
    let location = undefined;

    await database
      .collection('users')
      .updateOne(
        { _id: ObjectId(process.env.USER_ID) },
        { $set: { last_query: req.body } }
      );

    // Get the doggos with the previously created query
    doggos = await database.collection('doggos').find(query, {}).toArray();

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
    const user = await database
      .collection('users')
      .findOne({ _id: ObjectId(process.env.USER_ID) });

    // Save the id when a doggo is liked or disliked
    if (req.body.skip) {
      await database
        .collection('users')
        .updateOne(
          { _id: ObjectId(process.env.USER_ID) },
          { $push: { disliked_doggos: doggo._id } }
        ); // Dislike
    } else {
      await database
        .collection('users')
        .updateOne(
          { _id: ObjectId(process.env.USER_ID) },
          { $push: { liked_doggos: doggo._id } }
        ); // Like

      // Get the owner of the dog currently being displayed
      const owner = await database
        .collection('users')
        .findOne({ _id: doggo.owner_id });

      // Get every user that has liked me and is a potential match
      const myPotentialMatches = user.potential_matches.toString();

      // If the dog owner is in my potential matches then add his dog to my matched doggos
      if (myPotentialMatches.includes(owner._id)) {
        await database
          .collection('users')
          .updateOne(
            { _id: ObjectId(user._id) },
            { $push: { matched_doggos: doggo._id } }
          );

        // And add my dog to his matched doggos
        await database
          .collection('users')
          .updateOne(
            { _id: ObjectId(owner._id) },
            { $push: { matched_doggos: user.doggo_id } }
          );

        // Create the chat log for the matched doggos
        await database.collection('chat_logs').insertOne({
          doggo_ids: [user.doggo_id, doggo._id],
          messages: []
        });
      }
      // If the dog owner has not liked me yet then add my user id to his potential matches
      else {
        await database
          .collection('users')
          .updateOne(
            { _id: owner._id },
            { $push: { potential_matches: user._id } }
          );
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
  } catch (error) {
    console.log(error);
  }
});

async function getQuery(params) {
  try {
    // Get the current user
    const user = await database
      .collection('users')
      .findOne({ _id: ObjectId(process.env.USER_ID) });

    // Filter the doggos that have been liked, disliked or belong to the owner
    let likedDislikedDoggos = user.liked_doggos.concat(user.disliked_doggos);
    likedDislikedDoggos.push(user.doggo_id);

    // Get the selected location ids
    let selectedLocationIds = params.location_ids.map(id => parseInt(id, 10));

    // Return the query
    return {
      _id: { $nin: likedDislikedDoggos },
      age: { $gt: 0, $lt: parseInt(params.age, 10) },
      doggo_vibe: { $in: params.doggo_vibes },
      location_id: { $in: selectedLocationIds }
    };
  } catch (error) {
    console.log(error);
  }
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
