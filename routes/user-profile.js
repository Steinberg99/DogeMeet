const express = require('express');
const router = express.Router();

router.get('/user-profile', async (req, res) => {
  try {
    //Get the database conncection
    let database = req.app.get('database');

    let locations = await database.collection('locations').find().toArray();

    // Render the profile page
    res.render('user-profile', {
      locations: locations
    });
  } catch (error) {
    console.log(error);
  }
});

// Export the router
module.exports = router;

// Update profile
router.post("/updateprofile", async (req, res) => {
  try {
  const query = { _id: '01' };
  const getProfile = await db.collection('profile').findOne(query);
  //vul variabelen met ingevulde info of oude info wanneer niks in ingevuld
  const userName = ((req.body.firstName == null) ? getProfile.firstName : req.body.firstName)
  const email = ((req.body.email == null) ? getProfile.email : req.body.email)
  const password = ((req.body.password == null) ? getProfile.password : req.body.password)

  //update met de hierboven gevulde variabelen
  const updateDoc = {
      $set: {
          userName: userName,
          email: email,
          password: password,
      },
  };
  console.log(updateDoc);
  const filter = { _id: "01" };
  const opties = { upsert: true };
  const result = await db.collection('profile').updateOne(filter, updateDoc, opties);
} catch (error) {
  console.error(error);

} finally {
  res.redirect('profile');
}
});

