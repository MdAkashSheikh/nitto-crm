const { 
    postDataSourc, 
    getDataSource, 
    editDataSource, 
    deleteDataSource, 
    toggleSourceData
} = require('../controllers/dataSource');

const express = require('express');
const router = express.Router();

router.post('/post-data-source', postDataSourc);
router.post('/edit-data-source/:id', editDataSource);
router.get('/get-data-source', getDataSource);
router.delete('/delete-data-source/:id', deleteDataSource);
router.post('/toggle-source-data/:id', toggleSourceData);

module.exports = router;