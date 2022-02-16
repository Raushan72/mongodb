var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
let dbo;
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbo = db.db("mydatabase");

    console.log("conected");
});




const express = require('express');
const api = express();
api.use(express.json());
var uuid = require('uuid');



api.post('/', (req, res) => {
    req.body.id = new Date().valueOf()
    dbo.collection("mycollection").insertOne(req.body, function (err, result) {
        if (err) {
           return res.send('error hai')
            }
            res.send('added')
        });
});



api.get('/', (req, res) => {
    dbo.collection("mycollection").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result)
      });
});




api.get('/:id', (req, res) => {
    const id = +req.params.id
    dbo.collection("mycollection").findOne({id}, function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result)
      });
});



api.put('/:id', (req, res) => {
    const id = +req.params.id
    dbo.collection("mycollection").updateOne({id},{$set: req.body}, function(err, result) {
        if (err) throw err;
        console.log("1 document updated");
        res.send('updated')
      });
});


api.delete('/:id', (req, res) => {
    const id = +req.params.id
    dbo.collection("mycollection").deleteOne({id}, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        res.send('deleted')
      });
});



api.listen(3000, (req, res) => {
    console.log('server is going on')
});