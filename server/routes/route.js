const { 
    postDataGroup, 
    editDataGroup, 
    getDataGroup, 
    deleteDataGroup, 
    toggleDataGroup 
} = require('../controllers/dataGroup');

const { 
    postDataSourc, 
    getDataSource, 
    editDataSource, 
    deleteDataSource, 
    toggleSourceData
} = require('../controllers/dataSource');

const { 
    postPriority, 
    getPriority, 
    editPriority, 
    deletePriority, 
    togglePriority 
} = require('../controllers/priorityGroup');

const express = require('express');
const router = express.Router();

//Data Source Route URL
router.post('/post-data-source', postDataSourc);
router.post('/edit-data-source/:id', editDataSource);
router.get('/get-data-source', getDataSource);
router.delete('/delete-data-source/:id', deleteDataSource);
router.post('/toggle-source-data/:id', toggleSourceData);

//Data Group Route URL
router.post('/post-data-group', postDataGroup);
router.post('/edit-data-group/:id', editDataGroup);
router.get('/get-data-group', getDataGroup);
router.delete('/delete-data-group/:id', deleteDataGroup);
router.post('/toggle-data-group/:id', toggleDataGroup);

// Priority Group Route URL
router.post('/post-priority', postPriority);
router.post('/edit-priority/:id', editPriority);
router.get('/get-priority', getPriority);
router.delete('/delete-priority/:id', deletePriority);
router.post('/toggle-priority/:id', togglePriority);


module.exports = router;