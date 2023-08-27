const express = require('express');
const app = express();

// local imports
const history=require('./routes/history');
const { evalExpression } = require('./controllers/getOperations');

// dotenv for PORT
require('dotenv').config()

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// Used EJS as view engine
app.set('view engine', 'ejs')

// routes
app.use('/history',history)
app.get('/', (req, res) => {
  // ejs file render
    res.render('index')
});
app.get('/*',evalExpression)


// Server started
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
