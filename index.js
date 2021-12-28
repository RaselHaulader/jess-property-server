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
    const wishCollection = propertyBazar.collection('wishes')


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
    // get selected property 
    app.get('/selectedItem/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await propertiesCollection.findOne(query);
      res.json(result)
    })
    // save user
    app.post('/saveUser', async (req, res) => {
      const user = req.body
      const filter = { email: user.email }
      const updateDoc = { $set: { name: user.name } }
      const option = { upsert: true }
      const result = await usersCollection.updateOne(filter, updateDoc, option);
      res.json(result);
    })

    // user post
    app.get('/userPosts/:email', async (req, res) => {
      const email = req.params.email;
      const query = { user: email }
      const result = await propertiesCollection.find(query).toArray();
      res.json(result);
    })

    // delete user post
    app.post('/deletePost', async (req, res) => {
      const id = req.body
      const filter = { _id: ObjectId(id) }
      const result = await propertiesCollection.deleteOne(filter);
      res.json(result)
    })

    // add wish list 
    app.post('/addWish', async (req, res) => {
      const data = req.body
      const filter = { id: data.id }
      const updateDoc = {
        $set: {
          user: data.user,
          price: data.price,
          name: data.name,
          category: data.category,
          PropertyType: data.PropertyType
        }
      }
      const option = { upsert: true }
      const result = await wishCollection.updateOne(filter, updateDoc, option);
      res.json(result);
    })

    // user wish
    app.get('/getWish/:email', async (req, res) => {
      const email = req.params.email;
      const query = { user: email }
      const result = await wishCollection.find(query).toArray();
      res.json(result);
    })

    // delete user post
    app.post('/deleteWish', async (req, res) => {
      const id = req.body
      const filter = { _id: ObjectId(id) }
      const result = await wishCollection.deleteOne(filter);
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