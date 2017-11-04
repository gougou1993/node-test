var express = require('express');
var router = express.Router();
var sql = require('../public/javascripts/sql');

/* GET list page. */
router.get('/', function(req, res, next) {
  var sqltext = 'select b.title,a.* from Content_List a left join Movies_List b on a.movieId=b.id where b.id is not null';
  sql.list(res, sqltext, 'list', 'list', {
    title: '评论列表',
    activeIndex: '/list',
    list: []
  })
});

module.exports = router;