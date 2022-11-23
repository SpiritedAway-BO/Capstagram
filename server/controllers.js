const db = require('./neo4j.js');

module.exports = {
  getAllUsers: async (req, res) => {
    const session = db.session();
    const queryResult = await session.executeRead((tx) => tx.run(`MATCH (u:User) return u`));
    const results = queryResult.records.map(record => record.get('n').properties);
    session.close();
  },
  createUser: async (req, res) => {

  }
}