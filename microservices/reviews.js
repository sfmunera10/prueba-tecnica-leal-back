var express = require('express');
var router = express.Router();
var review = require('../controllers/reviewController.js');
 
/* GET review listing. */
router.get('/',review.findAll);

/* GET one review. */
router.get('/find-id/:id',review.findOne);
  
/* POST review. */
router.post('/',review.create);
 
/* update review. */
router.put('/:id',review.update);
 
/* DELETE review. */
router.delete('/:id',review.destroy);
 
module.exports = router;