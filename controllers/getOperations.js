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

const evalExpression = (req, res) => {
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
};

module.exports = {
    evalExpression,
    operationsHistory
};
