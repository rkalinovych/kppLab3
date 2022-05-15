const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const authRouter = require('./routes/authRouter')
const path = require('path');


const PORT = process.env.port || 4200;

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.json());
app.use(authRouter);
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://rostyslav:2237didose@cluster0.fhure.mongodb.net/myFirstDatabase')
    app.listen(PORT, () => {
      console.log('Server has been started...')
    })
  } catch (e) {
    console.log(e)
  }
}

start()