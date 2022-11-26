const models = require('./mongoDB.js');

module.exports = {
  getAllUsers: (req, res) => {
    models.getUsers()
      .then(users => res.status(200).send(users.data))
      .catch(err => res.status(404).send(err));
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
    var uri = req.body.uri;
    models.postPhoto(userInfo, uri)
      .then(response => res.status(201).end())
      .catch(err => res.status(404).send(err));
  },
  getMainFeedPhotos: (req, res) => {
    models.getPhotos(req.body.firebaseID, (err, docs) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        console.log('docs inside controllers: ', docs);
        res.status(200).send(docs);
      }
    });
  }
};