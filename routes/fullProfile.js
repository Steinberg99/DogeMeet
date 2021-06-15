const express = require('express');
const router = express.Router();

  router.get("/fullProfile",  async (req, res) => {
    //let getProfile = null;
    const userInfo = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    const dogInfo = {
        name: req.body.name,
        age: req.body.age,
        breed: req.body.breed,
        description: req.body.description,
        vibe: req.body.vibe,
        location: req.body.location
    };
try {  
      // Get the database connection
    database = req.app.get('database');
    const userQuery = { _id: '500691074'};
    getProfile = await database.collection('users').findOne(userQuery);
    
    const dogQuery = { doggoId: '10'};
    getDogProfile = await database.collection('doggos').findOne(dogQuery);
    
    console.log(getProfile)
    console.log(getDogProfile)

} catch (error) {
    console.error(error);

    } finally {
    res.render('fullProfile', {
        userInfo:getProfile,
        dogInfo:getDogProfile
        });
    }
});
// Export the router
module.exports = router;