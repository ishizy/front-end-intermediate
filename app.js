// require the npm library
const express = require('express');
const bodyParser = require('body-parser');
// create a var for the app to be built using express
// app is the global variable namespace for the program we are building
const app = express();
const port = 9000;
const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));

// app.listen(port, function() {
//   console.log(`Listening on port ${port}!`);
// });

//app.use(express.static('app'));
app.get('/', (req, res) => {
  db
    .collection('entries')
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      // renders index.ejs
      res.render('index.ejs', { entries: result });
    });
});

app.get('/watchlist', function(req, res) {  // our second route
  res.send(`
    <h1>Watchlist</h1>
    <p>Commentary on Watchlists will go here.</p>
    `);
});

app.get('/entry/:name', function(req, res) {
    let name = req.params.name;
    res.send(`
      <h1>${name}</h1>
      <p>Commentary on ${name} will go here.</p>
      `);
  });

  app.get('/reverse/:name', (req, res) => {
    const reverse = [...req.params.name].reverse().join('');
    res.send(reverse)
  })
  
  app.get('*', function(req, res){
    res.send(`
      <h1>Page not found</h1>
      `)
  })

  
  MongoClient.connect('mongodb://ishizy:yumi123@ds163510.mlab.com:63510/bcl1', (err, database) => {
  
  if (err) return console.log(err);
  db = database.db('bcl1')
  app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
});
app.post('/entries', (req, res) => {
  db.collection('entries').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
});
