const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const db = require('./config/database');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger);

app.use('/api', apiRoutes);

app.use(errorHandler);

async function startup() {
  try {
    await db.initialize();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startup();

process.on('SIGTERM', async () => {
  await db.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await db.close();
  process.exit(0);
});

