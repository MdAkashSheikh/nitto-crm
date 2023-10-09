const { 
    postDataSourc, getDataSource, editDataSource, deleteDataSource } = require('../controllers/dataSource');

const express = require('express');
const router = express.Router();

router.post('/post-data-source', postDataSourc);
router.post('/edit-data-source/:id', editDataSource);
router.get('/get-data-source', getDataSource);
router.delete('/delete-data-source/:id', deleteDataSource)

module.exports = router;