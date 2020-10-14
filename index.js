const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;


const port = 5000



const app = express()

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World!')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bmdyz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const orderCollection = client.db("creativeAgencyTeam").collection("orders");
  console.log('Database connected');


  app.post('/addOrder', (req, res) => {
    const order = req.body;
    console.log(order);
    orderCollection.insertOne(order)
        .then((result) => {
            res.send(result.insertedCount > 0)
        })
})

});
