const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

console.log(process.env); // process.env is to get all the env variables

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
