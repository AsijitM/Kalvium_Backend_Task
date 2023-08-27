const express = require('express');
const app = express();

const history=require('./routes/history');
const { evalExpression } = require('./controllers/getOperations');

require('dotenv').config()

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.set('view engine', 'ejs')

app.use('/history',history)

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.send('Hello Welcome to Kalvium server');
// });

app.get('/', (req, res) => {
    res.render('index')
});

// app.get('/*', (req, res) => {

// });

app.get('/*',evalExpression)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
