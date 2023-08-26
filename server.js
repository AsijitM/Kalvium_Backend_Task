const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.send('Hello Welcome to Kalvium server');
// });

app.get('/', (req, res) => {
  res.send(`
        <h1>Math API</h1>
        <ul>
            <li><a href="/history">History</a></li>
            <li>Example operations:
                <ul>
                    <li><a href="/5/plus/3">/5/plus/3</a></li>
                    <li><a href="/5/minus/3/plus/8">/5/minus/3/plus/8</a></li>
                    <li><a href="/3/into/5/plus/8/into/6">/3/into/5/plus/8/into/6</a></li>
                    <!-- Add more examples here -->
                </ul>
            </li>
        </ul>
    `);
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
