const express = require('express');
const router = express.Router();

  router.get("/fullProfile",  async (req, res) => {
    let getProfile = null;
    const userInfo = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    let dogInfo = {
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
    const query = { name: 'Natascha'};
    getProfile = await database.collection('users').findOne(query);
    
    const dogQuery = { name: 'chichi'};
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