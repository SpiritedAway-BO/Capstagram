const db = require('./neo4j.js');

const getCaptionsModel = async (photoId) => {
  try {
    const session = db.session();
    return await session.executeRead((tx) => tx.run(`MATCH (p:Photo {id: '${photoId}'})<-[:POSTED_ON]-(c:Caption) MATCH (u:User)-[:CREATED]->(:Caption {id: c.id}) OPTIONAL MATCH (l:User)-[:LIKES]->(:Caption {id: c.id}) return c, u, collect(l)`))
      .then(result => result.records.map(record => {
        const returnObj = record.get('c').properties;
        returnObj.captioner = record.get('u').properties;
        returnObj.likeUsers = record.get('collect(l)').map((record => record.properties));
        returnObj.likes = returnObj.likeUsers.length;
        return returnObj;
      }))
      .catch(err => console.log(err));

    //const returnArr = [];
    // for (let i = 0; i < queryResult.length; i++) {
    //   const returnObj = queryResult[i];
    //   // get captioner
    //   returnObj.captioner = await session.executeRead((tx) => tx.run(`MATCH (u:User)-[:CREATED]->(:Caption {id: '${queryResult[i].id}'}) return(u)`))
    //     .then(result => result.records[0].get('u').properties);
    //   // get users who liked caption
    //   returnObj.likeUsers = await session.executeRead((tx) => tx.run(`MATCH (u:User)-[:LIKES]->(:Caption {id: '${queryResult[i].id}'}) return(u)`))
    //     .then(result => result.records.map(record => record.get('u').properties));
    //   returnObj.likes = returnObj.likeUsers.length;
      /*Promise.all([captioner, likeUsers])
        .then(values => {
          returnObj.captioner = values[0];
          returnObj.likeUsers = values[1];
          returnArr.push(returnObj);
        })*/
      //console.log('obj: ', returnObj);
      //returnArr.push(returnObj);
      //console.log('arr: ', returnArr);
    //}
    session.close();
    return returnArr;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const session = db.session();
      const queryResult = await session.executeRead((tx) => tx.run(`MATCH (u:User) return(u)`))
        .then(result => result.records.map(record => record.get('u').properties))
      res.status(200);
      res.end(JSON.stringify(queryResult));
      session.close();
    } catch (error) {
      console.log(error);
      res.status(500);
      res.end();
    }

  },
  createUser: async (req, res) => {
    if (req.body.hasOwnProperty('userId') && req.body.hasOwnProperty('username')) {
      try {
        const session = db.session();
        const writeResult = await session.executeWrite((tx) => tx.run(`CREATE (u:User {id: '${req.body.userId}', username: '${req.body.username}', profilePicURI: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png', bio: ''}) return(u)`))
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
      res.status(400);
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
        res.end(JSON.stringify(queryResult));
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
  putUserBio: async (req, res) => {
    if (req.params.hasOwnProperty('userId') && req.body.hasOwnProperty('bio')) {
      try {
        const session = db.session();
        const updateResult = await session.executeWrite((tx) => tx.run(`MATCH (u:User {id:'${req.params.userId}'}) SET u.bio = '${req.body.bio}' return(u)`))
          .then(result => result.records[0].get('u'));
        console.log('Updated user bio: ', updateResult);
        session.close();
        res.status(204);
        res.end();
      } catch (error) {
        res.status(500);
        res.end();
      }
    } else {
      res.status(400);
      res.end();
    }
  }
  putProfilePic: async (req, res) => {
    if (req.params.hasOwnProperty('userId') && req.body.hasOwnProperty('uri')) {
      try {
        const session = db.session();
        const updateResult = await session.executeWrite((tx) => tx.run(`MATCH (u:User {id:'${req.params.userId}'}) SET u.profilePicURI = '${req.body.uri}' return(u)`))
          .then(result => result.records[0].get('u'));
        console.log('Updated user profile pic: ', updateResult);
        session.close();
        res.status(204);
        res.end();
      } catch (error) {
        res.status(500);
        res.end();
      }
    } else {
      res.status(400);
      res.end();
    }
  },
  getPhotoCaptions: async (req, res) => {
    if (req.params.hasOwnProperty('photoId')) {
      try {
        const session = db.session();
        const queryResult = await session.executeRead((tx) => tx.run(`MATCH (p:Photo)<-[:POSTED_ON]-(caption) WHERE p.id='${req.params.photoId}' return(caption)`))
          .then(result => result.records.map(record => record.get('caption').properties))
        const returnArr = [];
        for (let i = 0; i < queryResult.length; i++) {
          const returnObj = queryResult[i];
          // get captioner
          returnObj.captioner = await session.executeRead((tx) => tx.run(`MATCH (u:User)-[:CREATED]->(:Caption {id: '${queryResult[i].id}'}) return(u)`))
            .then(result => result.records[0].get('u').properties);
          // get users who liked caption
          returnObj.likeUsers = await session.executeRead((tx) => tx.run(`MATCH (u:User)-[:LIKES]->(:Caption {id: '${queryResult[i].id}'}) return(u)`))
            .then(result => result.records.map(record => record.get('u').properties));
          returnObj.likes = returnObj.likeUsers.length;
          /*Promise.all([captioner, likeUsers])
            .then(values => {
              returnObj.captioner = values[0];
              returnObj.likeUsers = values[1];
              returnArr.push(returnObj);
            })*/
          returnArr.push(returnObj);
        }
        res.status(200);
        res.end(JSON.stringify(returnArr));
        session.close();
        /*
        const session = db.session();
        const queryResult = await session.executeRead((tx) => tx.run(`MATCH (p:Photo)<-[:POSTED_ON]-(caption) WHERE p.id='${req.params.photoId}' return(caption)`))
          .then(result => result.records.map(record => record.get('caption').properties))
        const likes = await session.executeRead((tx) => tx.run(`MATCH (u:User)-[:LIKES]->(:Photo {id: '${req.params.photoId}'})`))
        res.status(200);
        res.end(JSON.stringify(queryResult));
        session.close();
        */
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
    if (req.body.hasOwnProperty('photoId') && req.body.hasOwnProperty('body') && req.body.hasOwnProperty('userId')) {
      try {
        const session = db.session();
        const writeResult = await session.executeWrite((tx) => tx.run(`CREATE (c:Caption {id: apoc.create.uuid(), body: '${req.body.body}', timePosted: '${Date.now()}', likes: '0'}) return(c)`))
          .then(result => result.records[0].get('c').properties)
          .catch(err => console.log(err));

        const writePhotoRelationResult = await session.executeWrite((tx) => tx.run(`MATCH (c:Caption), (p:Photo) WHERE c.id = '${writeResult.id}' AND p.id = '${req.body.photoId}' CREATE (c)-[:POSTED_ON]->(p) return(p)`))
          .then(result => result.records[0].get('p').properties)
          .catch(err => console.log(err));

        const writeUserCaptionRelationResult = await session.executeWrite((tx) => tx.run(`MATCH (c:Caption), (u:User) WHERE c.id = '${writeResult.id}' AND u.id = '${req.body.userId}' CREATE (u)-[:CREATED]->(c)`));

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
      res.status(400);
      res.end();
    }
  },
  patchCaption: async (req, res) => {
    if (req.params.hasOwnProperty('captionId') && req.body.hasOwnProperty('userId')) {
      try {
        const session = db.session();
        const currentLikes = await session.executeRead((tx) => tx.run(`MATCH (c:Caption {id: '${req.params.captionId}'})<-[r:LIKES]-(:User {id: '${req.body.userId}'}) return(r)`))
          .then(results => results.records.map(record => record.get('r').properties));
        if (currentLikes.length < 1) {
          const likeAddResult = await session.executeWrite((tx) => tx.run(`MATCH (c:Caption {id: '${req.params.captionId}'}), (u:User {id: '${req.body.userId}'}) CREATE (c)<-[:LIKES]-(u)`))
            .then(() => {
              console.log('Like added on photo ', req.params.captionId, ' by user ', req.body.userId);
              res.status(204);
              res.end();
            })
        } else {
          const likeRemoveResult = await session.executeWrite((tx) => tx.run(`MATCH (c:Caption {id: '${req.params.captionId}'})<-[r:LIKES]-(:User {id: '${req.body.userId}'}) DELETE r`))
            .then(() => {
              console.log('Like removed on photo ', req.params.captionId, ' by user ', req.body.userId);
              res.status(204);
              res.end();
            })
        }
        // Numeric likes value
        /*
        const currentLikes = await session.executeRead((tx) => tx.run(`MATCH (c:Caption {id: '${req.params.captionId}'}) return(c)`))
            .then(result => Number(result.records[0].get('c').properties.likes))
            .catch(err => console.log(err));
        if (req.body.upvote) {
          const writeResult = await session.executeWrite((tx) => tx.run(`MATCH (c:Caption {id: '${req.params.captionId}'}) SET c.likes = ${currentLikes + 1} return(c)`))
            .then(result => result.records[0].get('c').properties)
            .catch(err => console.log(err));
          console.log('Caption ', req.params.captionId, ' has been upvoted');
          res.status(204);
          res.end();
        } else {
          const writeResult = await session.executeWrite((tx) => tx.run(`MATCH (c:Caption {id: '${req.params.captionId}'}) SET c.likes = ${currentLikes - 1} return(c)`))
            .then(result => result.records[0].get('c').properties)
            .catch(err => console.log(err));
          console.log('Caption ', + req.params.captionId + ' has been downvoted');
          res.status(204);
          res.end();
        }
        */
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
  postPhoto: async (req, res) => {
    if (req.body.hasOwnProperty('currentUser') && req.body.hasOwnProperty('uri')) {
      try {
        const session = db.session();
        const writeResult = await session.executeWrite((tx) => tx.run(`CREATE (p:Photo {id: apoc.create.uuid(), url: '${req.body.uri}', timePosted: '${Date.now()}'}) return(p)`))
          .then(result => result.records[0].get('p').properties);
        console.log('Photo created: ', writeResult);
        const relationResult = await session.executeWrite((tx) => tx.run(`MATCH (a:User), (b: Photo) WHERE a.id = '${req.body.currentUser.uid}' AND b.id = '${writeResult.id}' CREATE (a)-[:CREATED]->(b)`));
        res.status(201);
        res.end();
        session.close();
      } catch (error) {
        console.log(error);
        res.status(500);
        res.end();
      }
    } else {
      res.status(400);
      res.end();
    }
  },
  getPhotos: async (req, res) => {
    if (req.params.userId) {
      try {
        const session = db.session();
        const readResult = await session.executeRead((tx) => tx.run(`MATCH (p:Photo)<-[:CREATED]-(f:User)-[:IS_FRIEND]-(u:User {id: '${req.params.userId}'}) MATCH (p)<-[:CREATED]-(c:User) return p, c`))
          .then(results => results.records.map(record => {
            const returnObj = record.get('p').properties;
            returnObj.creator = record.get('c').properties;
            return returnObj
          }));
        for (let i = 0; i < readResult.length; i++) {
          readResult[i].captions = await getCaptionsModel(readResult[i].id);
        }
        res.status(200);
        res.end(JSON.stringify(readResult));
        session.close();
      } catch (error) {
        console.log(error);
        res.status(500);
        res.end();
      }
    } else {
      res.status(400);
      res.end();
    }
  },
  getUserPhotos: async (req, res) => {
    if (req.params.hasOwnProperty('userId')) {
      const session = db.session();
      const readResult = await session.executeRead((tx) => tx.run(`MATCH (p:Photo)<-[:CREATED]-(u:User {id: '${req.params.userId}'}) return p`))
        .then(results => results.records.map(record => record.get('p').properties));
      for (let i = 0; i < readResult.length; i++) {
        readResult[i].captions = await getCaptionsModel(readResult[i].id);
      }
      const userInfo = await session.executeRead((tx) => tx.run(`MATCH (u:User {id: '${req.params.userId}'}) return u`))
        .then(results => results.records[0].get('u').properties)
      const returnObj = {
        creator: userInfo,
        results: readResult
      }
      res.status(200);
      res.end(JSON.stringify(returnObj));
      session.close();
    } else {
      res.status(400);
      res.end();
    }
  },
  addFriend: async (req, res) => {
    if (req.body.firebaseID && req.body.friendID) {
      try {
        const session = db.session();
        const writeResult = await session.executeWrite((tx) => tx.run(`MATCH (a:User {id: '${req.body.firebaseID}'}), (b:User {id: '${req.body.friendID}'}) CREATE (a)-[:IS_FRIEND]->(b)`))
          .then(() => {
            console.log('friend relation created');
            res.status(201);
            res.end();
          })
        session.close();
      } catch (error) {
        console.log(error);
        res.status(500);
        res.end();
      }
    } else {
      res.status(400);
      res.end();
    }
  },
  getFriends: async (req, res) => {
    if (req.params.firebaseID) {
      try {
        const session = db.session();
        const friends = await session.executeRead((tx) => tx.run(`MATCH (f:User)-[:IS_FRIEND]-(:User {id: '${req.params.firebaseID}'}) return(f)`))
          .then((result) => result.records.map((record) => record.get('f').properties))
        res.status(200);
        res.end(JSON.stringify(friends));
      } catch (error) {
        console.log(error);
        res.status(500);
        res.end();
      }
    } else {
      res.status(400);
      res.end();
    }
  }
}