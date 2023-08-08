const express = require('express');
const { create, list, search, likes, likeModify, postsByUser } =require('../controllers/user.controllers.js')

const router = express.Router();

router.get('/list', list)
router.post('/singup', create)
router.post('/signin' ,signin)
router.post('/search', search)
router.post('/likes', likes)
router.post('/like/modify', likeModify)
router.get('/postsbyuser/:UserId', postsByUser);


router.param('UserId', UserById);

module.exports = router;