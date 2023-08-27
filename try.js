const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public')); // Serve HTML from the 'public' directory

const operationsHistory = [];
function evaluateExpression(expression) {
  const operators = {
    plus: '+',
    minus: '-',
    into: '*',
    // Add more operators if needed
  };

  const cleanExpression = expression.replace(
    /\/(plus|minus|into)\//g,
    (match, operator) => operators[operator]
  );
  const result = eval(cleanExpression);
  return result;
}

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

app.get('/history', (req, res) => {
  const historyList = operationsHistory.map(
    (entry) => `${entry.question} = ${entry.answer}`
  );
  res.send(
    `<h1>Operations History</h1>
    <ul>${historyList
      .map((item) => `<li>${item}</li>`)
      .join('')}
      </ul>`
  );
});

app.get('/*', (req, res) => {
  const operationString = req.params[0];
  const operationParts = operationString.split('/');
  // operationString = operationString.replace('plus', '+');
  // console.log(operationString);
  // console.log(operationParts);
  // const ans= evaluateExpression(operationString);
  // console.log(ans);

  try {
    answer = evaluateExpression(operationString);
    question = operationParts.join('');
    question = question
      .replaceAll('plus', '+')
      .replaceAll('into', '*')
      .replaceAll('minus', '-');
  } catch (error) {
    res.status(400).json({ error: 'Invalid operation' });
    return;
  }

  const historyEntry = { question, answer };
  operationsHistory.unshift(historyEntry);
  if (operationsHistory.length > 20) {
    operationsHistory.pop();
  }

  res.json({ question, answer });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
