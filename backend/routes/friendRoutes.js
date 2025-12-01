const express =require('express');
const router=express.Router();

const friendController=require('../controllers/friendController');
router.post('/request',friendController.trimiteCerere);
module.exports=router;