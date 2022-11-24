const neo4j = require('neo4j-driver');

const etl = async () => {
  const db = require('./neo4j.js');
  const session = db.session();

  const thisId = '425few4'
  // WORK HERE
  await session.executeWrite(tx => tx.run(`CREATE (:Random {id: 50, a: 'f'})`))
    .catch(err => console.log(err))

  const queryResult = await session.executeRead(tx => tx.run(`MATCH (r:Random {id: 50}) return(r.a)`))
    .then(result => result.records.map(record => record.get('(r.a)').properties));

  console.log(queryResult);


  // FULL QUERY
  const fullQueryResult = await session.executeRead((tx) => tx.run(`MATCH (n) return (n)`))
    .then(results => results.records.map(record => record.get('n')));
  console.log(fullQueryResult);

  // DELETE AND CLOSE
  await session.executeWrite((tx) => tx.run(`MATCH (n) DETACH DELETE n`))
    .catch(err => console.log(err));
  session.close();
}

etl();