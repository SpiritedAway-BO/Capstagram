const express = require('express');
const router = express.Router();
// const controllers = require('./Controllers');

// Get all users: GET /users
// Get user info: GET /user/:userId
// Add user: POST /user
// Edit user profile picture: PUT /user/:userId/profilePic
// Get user's friends: GET /user/:userId/friends
// Add user to user's friends: PUT /user/:userId/friend
//   - Query param: friendId
// Get user's photos: GET /photos
//   - Query param: userId
// Add photo for user: POST /photos
//   - Query param: userId

//User Routes
router.get('/users', controllers.getUsers);
router.get('/users/:userId', controllers.getUserInfo);
router.post('/users', controllers.addUser);
router.post('/users', controllers.addUser);



//Captions Routes
router.get('/captions', controllers.getCaptions);
router.post('/captions', controllers.postCaption);
router.put('/captions', controllers.likeCaption);

//Photos Routes
router.get('/photos', controllers.getPhotos);
router.get('/qa/questions/:question_id/answers', controllers.qnas.getAs);
router.post('/qa/questions', controllers.qnas.addQ);
router.post('/qa/questions/:question_id/answers', controllers.qnas.addA);
router.put('/qa/questions/:question_id/helpful', controllers.qnas.markQHelpful);
router.put('/qa/questions/:question_id/report', controllers.qnas.reportQ);
router.put('/qa/answers/:answer_id/helpful', controllers.qnas.markAHelpful);
router.put('/qa/answers/:answer_id/report', controllers.qnas.reportA);

//Friends Route
router.get('/friends', controllers.getFriends);
router.put('/friends', controllers.addFriend); //not sure if this should be put or post

module.exports = router;