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
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const orderCollection = client.db("creativeAgencyTeam").collection("orders");
    const reviewCollection = client.db("creativeAgencyTeam").collection("reviews");

    const servicesCollection = client.db("creativeAgencyTeam").collection("services");
    const adminCollection = client.db("creativeAgencyTeam").collection("adminEmail");
    console.log('Database connected');


    app.post('/addOrder', (req, res) => {
        const order = req.body;
        console.log(order);
        orderCollection.insertOne(order)
            .then((result) => {
                res.send(result)
            })
    })


    app.get('/allOrders', (req, res) => {
        orderCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    app.post('/addReview', (req, res) => {
        const review = req.body;
        console.log(review);
        reviewCollection.insertOne(review)
            .then((result) => {
                res.send(result)
            })
    })

    app.get('/reviews', (req, res) => {
        reviewCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.post('/addService', (req, res) => {
        const service = req.body;
        console.log(service);
        servicesCollection.insertOne(service)
            .then((result) => {
                res.send(result)
            })

    })

    app.get('/getServices', (req, res) => {
        servicesCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    app.post('/adminEmail', (req, res) => {
        const email = req.body;
        adminCollection.insertOne(email)
            .then((result) => {
                res.send(result)
            })
    })

    app.post('/isAdmin', (req, res) => {
        const email = req.body.email;
        adminCollection.find({ email: email })
            .toArray((err, adminEmail) => {
                res.send(adminEmail)
            })
    })
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })


});

app.listen(process.env.PORT || port)