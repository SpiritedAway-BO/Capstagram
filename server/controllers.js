const models = require('./mongoDB.js');

module.exports = {
  getAllUsers: (req, res) => {
    // console.log('getting');
    models.getUsers()
      .then(users => res.status(200).send(users))
      .catch(err => res.status(404).send(err));
  },
  getOneUser: (req, res) => {
    // console.log('getting');
    models.getUser(req.params.firebaseID, (err, docs) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        console.log('docs inside controllers: ', docs);
        res.status(200).send(docs);
      }
    });
  },
  createUser: (req, res) => {
    console.log('createUser req', req.body);
    models.addUser(req.body)
      .then(response => res.status(201).end())
      .catch(err => res.status(404).send(err));
  },
  addPhoto: (req, res) => {
    console.log('addPhoto req', req.body);
    var userInfo = req.body.currentUser;
    console.log('currentUser', userInfo);
    var uri = req.body.uri;
    models.postPhoto(userInfo, uri)
      .then(response => res.status(201).end())
      .catch(err => res.status(404).send(err));
  },
  getMainFeedPhotos: (req, res) => {
    console.log('getMainFeed req', req.params.firebaseID);
    models.getPhotos(req.params.firebaseID, (err, docs) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        console.log('docs inside controllers: ', docs);
        res.status(200).send(docs);
      }
    });
  },
  postCaption: (req, res) => {
    console.log('postCaption req', req.body);
    models.postCaption(req.body.username, req.body.photoID, req.body.captionBody, (err, docs) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        console.log('docs inside controllers: ', docs);
        res.status(200).send(docs);
      }
    });
  },
  getCaptions: (req, res) => {
    models.getCaptions(req.params.photoID, (err, docs) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        console.log('docs in controllers line 67', docs);
        res.status(200).send(docs);
      }
    });
  },
  putProfilePic: (req, res) => {
    console.log('updateProfilePic req', req.body);
    models.updateUserProfilePic(req.body.firebaseID, req.body.uri)
      .then(response => res.sendStatus(200))
      .catch(err => res.sendStatus(404));
  },
  getFriends: (req, res) => {
    models.getUserFriends(req.params.firebaseID, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(docs);
      }
    });
  },
  addFriend: (req, res) => {
    models.addUserFriend(req.body.firebaseID, req.body.friendID, (err, docs) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.sendStatus(201);
      }
    });
  }
};