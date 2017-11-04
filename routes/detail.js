var express = require('express');
var router = express.Router();
var sql = require('../public/javascripts/sql');

/* GET detail page. */
router.get('/:id', function(req, res, next) {
  sql.detail(res, 'select * from Movies_List where id = '+req.params.id, 'movie', 'detail', {
    title: '影片详情',
    activeIndex: '/detail',
    movie: {}
  })
});

router.post('/content/:id', function(req, res) {
  var formData = req.body;
  formData.address = req.ip;
  formData.movieId = req.params.id;
  var sqltext = "INSERT INTO [Content_List]([address],[content],[movieId]) VALUES ('" + formData.address + "','" + formData.content + "','" + formData.movieId + "')";
  sql.add(res, sqltext);
});

module.exports = router;
