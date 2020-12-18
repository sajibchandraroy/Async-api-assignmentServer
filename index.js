const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8jj3c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

app.get('/', (req, res) => {
    res.send("hello from db it's working working")
    // console.log('Database connect');
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('database connected');
    console.log('database connected');
    const userCollection = client.db("randomAPIAssignment").collection("data");
    app.post('/data', (req, res) => {
        const newUser = req.body
        console.log(newUser)
        userCollection.insertOne(newUser)
            .then(result => {  
                console.log(result)              
                res.send(result.insertedCount > 0)
            })
    })

    app.get('/data', (req, res) => {
        userCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })
});


app.listen(process.env.PORT || port)