const express = require('express');
const { create, signin, modify, followCheck, followModify, UserById, data, addCity } =require('../controllers/user.controllers.js')

const router = express.Router();

router.get('/data/:UserId', data);
router.post('/signup', create)
router.post('/signin' ,signin)
router.post('/modify', modify)
router.post('/addcity', addCity)
router.post('/follow/check', followCheck);
router.post('/follow/modify', followModify)

router.param('UserId', UserById);

module.exports = router;