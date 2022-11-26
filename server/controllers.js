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
};