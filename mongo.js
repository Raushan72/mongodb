var {MongoClient} = require('mongodb');
var url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

let collection;

async function connect(){
    await client.connect();
    console.log('connected successfully to server')
    const db = client.db('mydatabase');
    collection = db.collection('mycollection');
}
connect();


const express = require('express');
const api = express();
api.use(express.json());
var uuid = require('uuid');



api.post('/', async(req, res) => {
    req.body.id = new Date().valueOf()
    await collection.insertOne(req.body);
    res.send('added');
});



api.get('/', async(req, res) => {
    const result = await collection.find({}).toArray();
    res.send(result);
});




api.get('/:id', async(req, res) => {
    const id = +req.params.id
    const result = await collection.findOne({id});
    res.send(result)
});



api.put('/:id', async(req, res) => {
    const id = +req.params.id
    await collection.updateOne({id},{$set: req.body}); 
    res.send('updated')
});


api.delete('/:id', async(req, res) => {
    const id = +req.params.id
    await collection.deleteOne({id}); 
    res.send('deleted')
});



api.listen(3000, (req, res) => {
    console.log('server is going on')
});