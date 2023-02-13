const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const isAuth = require('./middleware/isAuth');

const schema = require('./schema/schema');

const app = express();
const PORT = 5000;

mongoose.connect(
  'mongodb+srv://LizavetaY:Pass123@cluster0.boj0emz.mongodb.net/DoTODOs',
  {
    useNewUrlParser: true
  }
);

app.use(cors());
app.use(isAuth);
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const dbConnection = mongoose.connection;

dbConnection.on('error', (err) => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to database'));

app.listen(PORT, (error) =>
  error
    ? console.log(error)
    : console.log(`Server started at http://localhost:${PORT}/graphql`)
);
