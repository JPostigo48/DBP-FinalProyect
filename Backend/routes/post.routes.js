const express = require('express');
const { create, list, search, likes, likeModify, postsByUser, PostById, file, fileCheck, likeCheck } =require('../controllers/post.controllers.js');
const { UserById } = require('../controllers/user.controllers.js');

const router = express.Router();

router.get('/list', list)
router.get('/file/:PostId', file)
router.get('/file/check/:PostId', fileCheck)
router.post('/create', create)
router.post('/search', search)
router.post('/likes', likes)
router.post('/like/check', likeCheck);
router.post('/like/modify', likeModify)
router.get('/postsbyuser/:UserId', postsByUser);


router.param('UserId', UserById);
router.param('PostId', PostById);

module.exports = router;