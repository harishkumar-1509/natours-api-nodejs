const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    ssl: true,
    authSource: 'admin',
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

// process.env is to get all the env variables
// console.log(process.env);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
