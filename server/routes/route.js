const { 
    postCategory, 
    editCategory, 
    getCategory, 
    deleteCategory, 
    toggleCategory 
} = require('../controllers/category');

const { 
    postCustomerInfo, 
    editCustomerInfo, 
    getCustomerInfo, 
    deleteCustomerInfo,
    toggleCustomerInfo,
    editManagerPanel
} = require('../controllers/customerInfo');

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
    postPotential, 
    getPotential, 
    editPotential, 
    deletePotential, 
    togglePotential 
} = require('../controllers/potentialCutomer');

const { 
    postPriority, 
    getPriority, 
    editPriority, 
    deletePriority, 
    togglePriority 
} = require('../controllers/priorityGroup');

const { 
    postService, 
    editService, 
    getService, 
    deleteService,
    toggleService
} = require('../controllers/service');

const { 
    postTank, 
    editTank, 
    getTank, 
    deleteTank,
    toggleTank
} = require('../controllers/tankInfo');

const { 
    postZone, 
    getZone, 
    editZone, 
    deleteZone, 
    toggleZone
} = require('../controllers/zone');

const express = require('express');
const router = express.Router();

/* -------------------------------- */
/*      Data Source Route URL       */
/* -------------------------------- */
router.post('/post-data-source', postDataSourc);
router.post('/edit-data-source/:id', editDataSource);
router.get('/get-data-source', getDataSource);
router.delete('/delete-data-source/:id', deleteDataSource);
router.post('/toggle-source-data/:id', toggleSourceData);

/* -------------------------------- */
/*       Data Group Route URL       */
/* -------------------------------- */
router.post('/post-data-group', postDataGroup);
router.post('/edit-data-group/:id', editDataGroup);
router.get('/get-data-group', getDataGroup);
router.delete('/delete-data-group/:id', deleteDataGroup);
router.post('/toggle-data-group/:id', toggleDataGroup);

/* -------------------------------- */
/*     Priority Group Route URL     */
/* -------------------------------- */
router.post('/post-priority', postPriority);
router.post('/edit-priority/:id', editPriority);
router.get('/get-priority', getPriority);
router.delete('/delete-priority/:id', deletePriority);
router.post('/toggle-priority/:id', togglePriority);

/* -------------------------------- */
/*   Potential Customer Route URL   */
/* -------------------------------- */
router.post('/post-potential', postPotential);
router.post('/edit-potential/:id', editPotential);
router.get('/get-potential', getPotential);
router.delete('/delete-potential/:id', deletePotential);
router.post('/toggle-potential/:id', togglePotential);

/* -------------------------------- */
/*         Zone Route URL           */
/* -------------------------------- */
router.post('/post-zone', postZone);
router.post('/edit-zone/:id', editZone);
router.get('/get-zone', getZone);
router.delete('/delete-zone/:id', deleteZone);
router.post('/toggle-zone/:id', toggleZone);

/* -------------------------------- */
/*       Category Route URL         */
/* -------------------------------- */
router.post('/post-category', postCategory);
router.post('/edit-category/:id', editCategory);
router.get('/get-category', getCategory);
router.delete('/delete-category/:id', deleteCategory);
router.post('/toggle-category/:id', toggleCategory);

/* -------------------------------- */
/*        Service Route URL         */
/* -------------------------------- */
router.post('/post-service', postService);
router.post('/edit-service/:id', editService);
router.get('/get-service', getService);
router.delete('/delete-service/:id', deleteService);
router.post('/toggle-service/:id', toggleService);

/* -------------------------------- */
/*  Customer Information Route URL  */
/* -------------------------------- */
router.post('/post-customer-info', postCustomerInfo);
router.post('/edit-customer-info/:id', editCustomerInfo);
router.get('/get-customer-info', getCustomerInfo);
router.delete('/delete-customer-info/:id', deleteCustomerInfo);
router.post('/toggle-customer-info/:id', toggleCustomerInfo);
router.post('/edit-manager-panel/:id', editManagerPanel);

/* -------------------------------- */
/*    Team Information Route URL    */
/* -------------------------------- */


/* -------------------------------- */
/*    Tank Information Route URL    */
/* -------------------------------- */
router.post('/post-tank', postTank);
router.post('/edit-tank', editTank);
router.get('/get-tank', getTank);
router.post('/delete-tank', deleteTank);
router.post('/toggle-tank', toggleTank);

module.exports = router;