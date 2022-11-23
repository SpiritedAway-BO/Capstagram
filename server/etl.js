const etl = async () => {
  const db = require('./neo4j.js');
  const session = db.session();
  // for (let i = 0; i < 100; i++) {
  //   const mockId = i;
  //   const mockUsername = `user${Math.floor(Math.random())}`
  //   const createString = `CREATE (n:User {id: $mockId, username: $mockUsername})`
  // }
  //await session.executeWrite(tx => tx.run('CREATE (n:DefaultNode {id: \'lol\'})'));
  const queryResult = await session.executeRead((tx) => tx.run('MATCH (n:DefaultNode) return n;'));
  console.log('hello');
  const results = queryResult.records.map(record => record.get('n').properties);
  console.log(results);

}

etl();