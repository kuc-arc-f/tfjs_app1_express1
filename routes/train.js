var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('train/index', {});
});
/******************************** 
* 
*********************************/
router.get('/new', function(req, res, next) {
    res.render('train/new', {});
});
/******************************** 
* 
*********************************/
router.get('/show/:id', function(req, res) {
	console.log(req.params.id  );
	res.render('mdats/show', {"params_id": req.params.id });
});
/******************************** 
* 
*********************************/
router.get('/edit/:id', function(req, res) {
console.log(req.params.id  );
	res.render('mdats/edit', {"params_id": req.params.id });
});
/******************************** 
* 
*********************************/
router.get('/chart', function(req, res, next) {
	res.render('train/chart', {});
});

module.exports = router;
