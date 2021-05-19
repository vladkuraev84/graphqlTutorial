
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 3005;

mongoose.connect('mongodb+srv://vladkuraev84:vlad1984@graphqltutorial.gxmyp.mongodb.net/graphqlTutorialDB?retryWrites=true&w=majority',
  {
    // dbName: "graphqlTutorialDB",
    // user: "vladkuraev84",
    // pass: "vlad1984",
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
// mongoose.connect('mongodb+srv://vladkuraev84:vlad1984@graphqltutorial.gxmyp.mongodb.net/graphqlTutorialDB?retryWrites=true&w=majority', { useMongoClient: true });

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, err => {
    err ? console.log(err) : console.log('Server started!');
});
