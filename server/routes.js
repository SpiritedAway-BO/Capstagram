const express = require('express');
const router = express.Router();
const controllers = require('./controllers.js');

//User Routes
router.get('/users', controllers.getAllUsers); //get all users for search
router.post('/users', controllers.createUser); //create new user
// router.get('/user/:userId', controllers.getUserInfo); //get a user's info
// router.put('/user/:userId/profilePic', controllers.putProfilePic); //update user profile pic
// // router.put('/users/:userId/profile', controllers.updateUserInfo); //update user
// //info

// //Captions Routes
// router.get('/captions/:photoId', controllers.getAllCaptions); // get captions for a photo
router.post('/captions', controllers.postCaption); // post a caption for a photo
// // router.delete('/captions/:captionId', controllers.deleteCaption); // lets a user delete their own caption - might need to think this route out better
// router.put('/captions/:captionId', controllers.likeCaption); // CHANGES a caption upvote (up or down)

// //Photos Routes
router.post('/photos', controllers.addPhoto); //posts user photo  - Query param: userId
router.get('/photos', controllers.getMainFeedPhotos); //gets all photos (esp. for trending)   - Query param: userId
// router.get('/photos/:userId', controllers.getPhotos); //gets one user's photos (for main page and friends page)

// //Friends Route
//  router.get('/user/:userId/friends', controllers.getFriends); //gets a user's friends
//  router.post('/user/:userId/friend', controllers.addFriend); // add a friend
//  router.delete('/user/:userId/friends', controllers.removeFriend); // removes a friend   - Query param: friendId

module.exports = router;