const mongoose = require('mongoose') ;
const Candidat = mongoose.model('Candidat');
const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
const ctrlCand = require('../controllers/candidat.controller'); 
const ctrlIntern = require('../controllers/intern.controller'); 
const storage=require('../helpers/storage')
const jwtHelper = require('../config/jwtHelper');
const { ObjectUnsubscribedError } = require('rxjs');

router.post('/register',  storage,ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile/:id',jwtHelper.verifyJwtToken, ctrlUser.userProfile)
router.get('/candProfile' ,ctrlCand.candProfile) ;
router.get('/usersProfile' ,ctrlUser.usersProfile) ;

 router.post('/save',ctrlCand.savee) ;
 router.post('/savee',ctrlIntern.savee) ;
 router.get('/internProfile' ,ctrlIntern.internProfile) ;
router.get("/:id", ctrlCand.findOne);
router.get("/:id", ctrlIntern.findIntern);
router.get("/count/2", ctrlCand.count);

router.get("/count/1", ctrlIntern.Count);
router.put("/cand/:id", ctrlCand.update);
router.delete("/cand/:id", ctrlCand.delete);
router.put("/intern/:id", ctrlIntern.Update);
router.delete("/intern/:id", ctrlIntern.Delete);
router.get("/name", ctrlCand.findByName);
router.post("/forgotPass", ctrlUser.forgotpassword);
router.post("/newPass", ctrlUser.newPass);
router.post("/validPass", ctrlUser.validPassToken);
router.put("/user/:id", ctrlUser.update);
router.delete("/user/:id", ctrlUser.delete);
module.exports = router;


