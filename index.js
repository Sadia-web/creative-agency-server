const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bmdyz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const port = 5000



const app = express()

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World!')
})




const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const orderCollection = client.db("creativeAgencyTeam").collection("orders");
  const servicesCollection = client.db("creativeAgencyTeam").collection("services");
  console.log('Database connected');


  app.post('/addOrder', (req, res) => {
    const order = req.body;
    console.log(order);
    orderCollection.insertOne(order)
        .then((result) => {
            res.send(result.insertedCount > 0)
        })
})

// insert review into database
app.post('/addReview', (req, res) => {
    const review = req.body;
    console.log(review);
    reviewCollection.insertOne(review)
        .then((result) => {
            res.send(result.insertedCount > 0)
        })
})

app.get('/reviews', (req, res) => {
    reviewCollection.find({}).sort({ _id: -1 }).limit(3)
        .toArray((err, documents) => {
            res.send(documents);
        })
})

app.post('/addService', (req, res) => {
    const service = req.body;
    console.log(service);
    servicesCollection.insertOne(service)
        .then((result) => {
            res.send(result.insertedCount > 0)
        })

})

app.get('/getServices', (req, res) => {
    servicesCollection.find({})
    .toArray((err, documents) => {
        res.send(documents)
    })
})


});

app.listen(process.env.PORT || port)