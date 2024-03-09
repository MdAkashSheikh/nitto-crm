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
    editManagerPanel,
    postfCustomer,
    getfCustomer,
    editfCustomer,
    getfOneCustomer
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
    postPackage, 
    editPackage, 
    getPackage, 
    deletePackage,
    togglePackage
} = require('../controllers/package_service');

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
    postTeamInfo, 
    editTeamInfo,
    getTeamInfo,
    deleteTeamInfo,
    toggleTeamInfo,
    uploadEmpPic,
    uploadEmpNid,
} = require('../controllers/teamInfo');

const { 
    postZone, 
    getZone, 
    editZone, 
    deleteZone, 
    toggleZone
} = require('../controllers/zone');

const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

/* -------------------------------- */
/*     Image Upload For Multer      */
/* -------------------------------- */
router.use(express.static('public'));
router.use(express.static('files'));
router.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

let storage_pic = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null,"pic_" + Date.now() + path.extname(file.originalname));
    }
})

let storage_nid = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null,"nid_" + Date.now() + path.extname(file.originalname));
    }
})


let upload_pic = multer({ storage: storage_pic });
let upload_nid = multer({ storage: storage_nid });

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
router.post('/post-fcustomer', postfCustomer);
router.post('/edit-fcustomer/:id', editfCustomer)
router.get('/get-fcustomer', getfCustomer);
router.get('/get-onecutomer/:id', getfOneCustomer);

/* -------------------------------- */
/*    Team Information Route URL    */
/* -------------------------------- */
router.post('/post-team-info', postTeamInfo);
router.post('/edit-team-info/:id', editTeamInfo);
router.get('/get-team-info', getTeamInfo);
router.delete('/delete-team-info/:id', deleteTeamInfo);
router.post('/toggle-team-info/:id', toggleTeamInfo);
router.post('/upload-emp-pic', upload_pic.single('photo'), uploadEmpPic);
router.post('/upload-emp-nid', upload_nid.single('photo'), uploadEmpNid);

/* -------------------------------- */
/*    Tank Information Route URL    */
/* -------------------------------- */
router.post('/post-tank', postTank);
router.post('/edit-tank/:id', editTank);
router.get('/get-tank', getTank);
router.delete('/delete-tank/:id', deleteTank);
router.post('/toggle-tank/:id', toggleTank);

/* -------------------------------- */
/*    Package Service Route URL     */
/* -------------------------------- */
router.post('/post-package', postPackage);
router.post('/edit-package/:id', editPackage);
router.get('/get-package', getPackage);
router.delete('/delete-package/:id', deletePackage);
router.post('/toggle-package/:id', togglePackage);

module.exports = router;