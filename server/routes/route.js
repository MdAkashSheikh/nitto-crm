const { postDataSourc, getData } = require('../controllers/dataSource');

const express = require('express');
const router = express.Router();

router.post('/post-data-source', postDataSourc)
router.get('/get-data', getData);

module.exports = router;