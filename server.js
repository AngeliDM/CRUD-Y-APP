console.log('Running!')
const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://angelimcd:q1vJpMWHGdjM1LdZ@cluster0.uwq1v.mongodb.net/?retryWrites=true&w=majority'
require('dotenv').config()

// MongoClient.connect(connectionString, )
// .then(client => {
//     console.log('Connected to Database')
//     const db = client.db('star-wars-quotes')
//     const quotesCollection = db.collection('quotes')
let db,
    dbConnectionStr = process.env.DB_STRING, //going into the env file for your connection string
    dbName = 'star-wars-quotes'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })//connecting to mongodb 
    .then(client => {
        console.log(`Connected to ${dbName} Database`)//console.log to let you know it's connected to the database
        db = client.db(dbName)

    app.set('view engine', 'ejs')

    //Middleware//
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json())

    //express handlers//
app.get('/', (req, res) =>{
     db.collection('quotes').find().toArray()
    .then(results => {
        res.render('index.ejs', {quotes: results})
    })
    .catch(error => console.error(error))
   
})
app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
    .then(result => {
        res.redirect('/')
    })
    .catch(error => console.error(error))
  })

  app.put('/quotes', (req, res)=> {
    quotesCollection.findOneAndUpdate(
        { name: 'Yoda' },
        {
            $set: {
                name: req.body.name,
                quote: req.body.quote
            }
        },
        {
            upsert: true //insert on if there is nothing matching 'Yoda'
        }
      )
        .then(result => {
            res.json('Success')
            
        })

        .catch(error => console.error(error))
  })

  app.delete('/quotes', (req, res) => {
    quotesCollection.deleteOne(
        { name: req.body.name }
      )
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No things to delete')
              }
              res.json(`Deleted a thing`)
            })
            .catch(error => console.error(error))
        })




app.listen(PORT, function() {
    console.log(`listening on Port ${PORT}`)
})
})
.catch(error => console.error(error))


