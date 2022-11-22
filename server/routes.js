const express = require('express');
const router = express.Router();
// const controllers = require('./Controllers');

//User Routes
router.post('/users', controllers.createUser); //create new user
// router.put('/users/:userId/profile', controllers.updateUserInfo); //update user info
router.put('/users/:userId/profilePic', controllers.putProfilePic); //update user profile pic
router.get('/users', controllers.getAllUsers); //get all users
router.get('/users/:userId', controllers.getUserInfo); //get a user's info

//Captions Routes
router.get('/captions/:photoId', controllers.getAllCaptions); // get captions for a photo
router.post('/captions/:photoId', controllers.postCaption); // post a caption for a photo
// router.delete('/captions/:captionId', controllers.deleteCaption); // lets a user delete their own caption - might need to think this route out better

router.put('/captions/:captionId', controllers.likeCaption); // changes a caption upvote

//Photos Routes
router.post('/photos', controllers.postPhoto); //posts user photo
router.get('/photos', controllers.getPhotos); //gets all photos (esp. for trending)
router.get('/photos/:userId', controllers.getPhotos); //gets one user's photos (for main page and friends page)


//Friends Route
router.get('/users/:userId/friends', controllers.getFriends); //gets a user's friends
router.post('/users/:userId/friends', controllers.addFriend); // add a friend
router.delete('/users/:userId/friends', controllers.removeFriend); // removes a friend

module.exports = router;