const { postDataSourc } = require('../controllers/dataSource');

const router = require('express').Router();

router.post('/post-data-source', postDataSourc)

module.exports = router;