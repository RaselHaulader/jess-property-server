const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient } = require('mongodb');
require('dotenv').config()
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;

app.use(express.json());
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.x89oq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    console.log('connected to db');
    const propertyBazar = client.db("PropertyBazar");
    const propertiesCollection = propertyBazar.collection('allProperties')
    const usersCollection = propertyBazar.collection('users')


    //post api
    app.post('/post', async (req, res) => {
      const properties = req.body;
      const result = await propertiesCollection.insertOne(properties);
      res.json(result)
    })
    // get 3 properties
    app.get('/allProperties3', async (req, res) => {
      const query = propertiesCollection.find({})
      const result = await query.sort({ date: 'descending' }).limit(3).toArray();
      res.json(result)
    })
    // get 4 properties
    app.get('/allProperties4', async (req, res) => {
      const query = propertiesCollection.find({})
      const result = await query.limit(4).toArray();
      res.json(result)
    })
    // get all property
    app.get('/allProperties', async (req, res) => {
      const query = propertiesCollection.find({})
      const result = await query.toArray();
      res.json(result)
    })

    app.get('/chk', async (req, res) => {
      const cursor = { category: 'For Sell' }
      const query = propertiesCollection.find(cursor)
      const result = await query.toArray();
      res.json(result)
    })

    // get selected property 
    app.get('/selectedItem/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await propertiesCollection.findOne(query);
      res.json(result)
    })
    // get selected property 
    app.get('/users', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await propertiesCollection.findOne(query);
      res.json(result)
    })
    // get selected property 
    app.get('/UserWishList', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await propertiesCollection.find(query);
      res.json(result)
    })
    // get selected property 
    app.get('/usersRequest', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await propertiesCollection.find(query);
      res.json(result)
    })
    
    // get selected property 
    app.get('/usersPost', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await propertiesCollection.find(query);
      res.json(result)
    })
    // get selected property 
    app.get('/allPost', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await propertiesCollection.find(query);
      res.json(result)
    })
    // get selected property 
    app.get('/allRequest', async (req, res) => {
        const email = req.body
        const query = { email : email }
      const result = await propertiesCollection.find(query);
      res.json(result)
    })
    // get selected property 
    app.post('/allWishList', async (req, res) => {
      const email = req.body
      const query = { email : email }
      const result = await propertiesCollection.find(query);
      res.json(result)
    })
    // get selected property 
    app.get('/allUser', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await propertiesCollection.find(query);
      res.json(result)
    })
    


  } finally {

  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('hello')
})


app.listen(port, () => {
  console.log('listening to port', port)
})