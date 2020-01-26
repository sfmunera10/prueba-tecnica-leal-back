var express = require('express');
var router = express.Router();
var user = require('../controllers/userController.js');
 
/* Find Best travel times leaderboard */
router.get('/leaderboard',user.findBestTravelTimesFromUsers);

/* Find user inventory listing by name */
router.get('/inventories-name/:name',user.findInventoriesFromUsersByUserName);

/* Find user inventory listing by company */
router.get('/inventories-company/:company',user.findInventoriesFromUsersByUserCompany);

/* GET user listing. */
router.get('/',user.findAll);

/* GET one user. */
router.get('/find-id/:id',user.findOne);

/* GET one user by name. */
router.get('/find-name/:name',user.findOneByName);
  
/* POST user. */
router.post('/',user.create);
 
/* update user. */
router.put('/:id',user.update);
 
/* DELETE user. */
router.delete('/:id',user.destroy);
 
module.exports = router;
