const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 9000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('app'));

app.post('/entries', (req, res) => {
  db.collection('entries').save(req.body, (err, result) => {
      console.log("submitted")
    res.redirect('/');
  });
});

app.get('*', function(req, res){
  res.send(`
    <h1>Oopsy! Page not found</h1>
    `)
})

MongoClient.connect('mongodb://ishizy:yumi123@ds163510.mlab.com:63510/bcl1', (err, database) => {
  if (err) return console.log(err);
  //db = database;
  db = database.db('bcl1')
  app.listen(port, () => {
    console.log(`From app-alt.js, Listening on port ${port}!`);
  });
});