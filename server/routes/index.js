var router = require('express').Router();
var connection = require('../db/connection');
var connectionString = connection.connectionString;
var pg = require('pg');

//*************
//Syntax to update table
//*************

// UPDATE budget
// SET budget = 500
// WHERE budget_id = 10;

//*************
router.post('/budget', function(req, res){
  console.log('router.post');
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(req.body);
      var budget = req.body.budget;
      var results = [];
      var query = client.query('INSERT INTO budget(budget)' + 'VALUES ($1) RETURNING budget',
          [budget]);
      query.on('error', function(error){
        console.log(error);
      });
      query.on('row', function(rowData){
        results.push(rowData);
      });
      query.on('end', function(){
        res.send(results);
        done();
      });
    }
  });
});
router.get('/budget', function(req, res){
  pg.connect(connectionString, function(err, client, done){
  if (err) {
    console.log(err);
    res.sendStatus(500);
  }else {
    var query = client.query('SELECT * FROM budget');
    var results = [];

    query.on('error', function(error){
      console.log(error);
      res.sendStatus(500);
    });
    query.on('row',function(rowData){
      results.push(rowData);
    })
    query.on('end',function(){
      res.send(results);
      done();
    });
  }
});
});
router.delete('/budget/:id', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      console.log('req.params', req.params);
      var id = req.params.id;
      console.log('req.params.id', req.params.id);
      var query = client.query('DELETE FROM budget WHERE budget_id=($1)', [id]);
      var results = [];
      query.on('error', function(error){
        console.log(error);
        res.sendStatus(500);
      });
      query.on('row', function(rowData){
        results.push(rowData);
      })
      query.on('end', function(){
        res.send(results);
        done();
      });
    }
  });
});
module.exports = router;
