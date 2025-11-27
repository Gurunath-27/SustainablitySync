const oracledb = require('oracledb');

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING
};

async function initialize() {
  try {
    await oracledb.createPool(dbConfig);
    console.log('Oracle Database connection pool created');
  } catch (err) {
    console.error('Error creating connection pool:', err);
  }
}

async function close() {
  try {
    await oracledb.getPool().close(10);
    console.log('Pool closed');
  } catch (err) {
    console.error('Error closing pool:', err);
  }
}

async function execute(statement, binds = [], opts = {}) {
  let connection;
  opts.outFormat = oracledb.OUT_FORMAT_OBJECT;
  opts.autoCommit = true;

  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(statement, binds, opts);
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

module.exports = {
  initialize,
  close,
  execute
};

