const express = require('express')
const app = express();
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const imageCount = require('./controllers/imageCount');
const profile = require('./controllers/profile');

const db = require('knex')({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  });
 


  app.use(express.urlencoded({extended: false}))
  app.use(express.json())
  app.use(cors())


app.get('/', (req, res)  => {
    res.json("working smartbrain api")
})
app.post('/signin', signin.handleSignIn(db, bcrypt))
app.post('/register' , (req, res) => (register.handleRegister(req, res, db, bcrypt)))
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => {imageCount.handleImageCount(req, res, db)});
app.post('/imageurl', (req, res) => {imageCount.handleAPICall(req, res)});
let PORT = process.env.PORT;
if(PORT === undefined) {
  PORT = 3200
}
app.listen(PORT, () => {
    console.log("hello shashwat, the server has started on PORT: ", PORT)
})

