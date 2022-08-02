console.log('Running!')
const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()


   const dbConnectionStr = process.env.DB_STRING 
   
    

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')
        console.log(`Connected to Database`)
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
            upsert: true 
        }
      )
        .then(result => {
            res.json('Success')
            console.log('success updating one')
            
        })

        .catch(error => console.error(error))
  })

  app.delete('/quotes', (req, res) => {
    quotesCollection.deleteOne(
        { name: req.body.name}
      )
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No things to delete')
              }
              res.json(`Deleted a thing`)
            })
            .catch(error => console.error(error))
        })


        

app.listen(process.env.PORT || PORT, () => {
    console.log(`running on Port ${PORT}`)
})
})
.catch(error => console.error(error))


