const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const authRouter = require('./routes/authRouter')
const appRouter = require('./routes/appRouter')
const path = require('path');
const bodyParser = require('body-parser')

const PORT = process.env.port || 4200;

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(authRouter);
app.use(appRouter);

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