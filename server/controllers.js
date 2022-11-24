const db = require('./neo4j.js');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const session = db.session();
      const queryResult = await session.executeRead((tx) => tx.run(`MATCH (u:User) return(u)`))
        .then(result => result.records.map(record => record.get('u').properties))
      res.status(200);
      res.end(queryResult);
      session.close();
    } catch (error) {
      console.log(error);
      res.status(500);
      res.end();
    }

  },
  createUser: async (req, res) => {
    if (req.data.hasOwnProperty('userId') && req.data.hasOwnProperty('username') && req.data.hasOwnProperty('email')) {
      try {
        const session = db.session();
        const writeResult = await session.executeWrite((tx) => tx.run(`CREATE (u:User {id: '${req.data.userId}', username: '${req.data.username}', profilePicUrl: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669161707/orange_hhc8pc.png'}) return(u)`))
          .then(result => result.records[0].get('u').properties);
        console.log('User created: ', writeResult);
        session.close();
        res.status(201);
        res.end();
      } catch (error) {
        console.log(error);
        res.status(500);
        res.end();
      }
    } else {
      res.status(401);
      res.end();
    }
  },
  getUserInfo: async (req, res) => {
    if (req.params.hasOwnProperty('userId')) {
      try {
        const session = db.session();
        const queryResult = await session.executeRead((tx) => tx.run(`MATCH (u:User {id: '${req.params.userId}'}) return(u)`))
          .then(result => result.records[0].get('u').properties)
        console.log('User info: ', queryResult);
        session.close();
        res.status(200);
        res.end(queryResult);
      } catch (error) {
        console.log(error);
        res.status(500);
        res.end();
      }
    } else {
      res.status(401);
      res.end();
    }
  },
  putProfilePic: async (req, res) => {
    if (req.params.hasOwnProperty('userID') && req.query.hasOwnProperty(profilePicUri)) {
      try {
        const session = db.session();
        const updateResult = await session.executeWrite((tx) => tx.run(`MATCH (u:User {id:'${req.params.userId}'}) SET u.profilePicUri = '${req.query.profilePicUri}' return(u)`))
          .then(result => result.records[0].get('u'));
        console.log('Updated user: ', updateResult);
        session.close();
        res.status(204);
        res.end();
      } catch (error) {
        res.status(500);
        res.end();
      }
    } else {
      res.status(401);
      res.end();
    }
  },
  getPhotoCaptions: async (req, res) => {
    if (req.params.hasOwnProperty('photoId')) {
      try {
        const session = db.session();
        const queryResult = await session.executeRead((tx) => tx.run(`MATCH (p:Photo)<-[:POSTED_ON]-(caption) WHERE p.id='${req.params.id}' return(caption)`))
          .then(result => result.records.map(record => record.get('caption').properties))
        res.status(200);
        res.end(queryResult);
        session.close();
      } catch (error) {
        console.log(error);
        res.status(500);
        res.end();
      }
    } else {
      res.status(401);
      res.end();
    }
  },
  postCaption: async (req, res) => {
    if (req.params.hasOwnProperty('photoId') && req.body.hasOwnProperty('body') && req.body.hasOwnProperty('time_created')) {
      try {
        const session = db.session();
        const writeResult = await session.executeWrite((tx) => tx.run(`CREATE (c:Caption {id: apoc.create.uuid(), body: '${req.body.body}', time_created: '${Number(req.body.time_created)}', likes: 0}) return(c)`))
          .then(result => result.records[0].get('c').properties);
        console.log('Caption created on image ', req.params.photoId, ': ', writeResult);
        res.status(201);
        res.end();
        session.close();
      } catch (error) {
        console.log(error);
        res.status(500);
        res.end();
      }
    } else {
      res.status(401);
      res.end();
    }
  },
  patchCaption: async (req, res) => {
    if (req.params.hasOwnProperty(captionId) && req.body.hasOwnProperty(upvote)) {
      try {
        const session = db.session();
        const currentLikes = await session.executeRead((tx) => tx.run(`MATCH (c:Caption {id: '${req.params.captionId}'}) return(c)`))
            .then(result => Number(result.records[0].get('c'.properties.likes)))
            .catch(err => console.log(err));
        if (req.body.upvote) {
          const writeResult = await session.executeWrite((tx) => tx.run(`MATCH (c:Caption {id: '${req.params.captionId}'}) SET c.likes = ${currentLikes + 1}`))
            .then(result => result.records[0].get('c').properties)
            .catch(err => console.log(err));
          console.log('Caption ', + req.params.captionId + ' has been upvoted');
          res.status(204);
          res.end();
        } else {
          const writeResult = await session.executeWrite((tx) => tx.run(`MATCH (c:Caption {id: '${req.params.captionId}'}) SET c.likes = ${currentLikes - 1}`))
            .then(result => result.records[0].get('c').properties)
            .catch(err => console.log(err));
          console.log('Caption ', + req.params.captionId + ' has been downvoted');
          res.status(204);
          res.end();
        }
        session.close();

      } catch (error) {
        console.log(error);
        res.status(500);
        res.end();
      }
    } else {
      res.status(401);
      res.end();
    }
  }
}