const operationsHistory = [];

function evaluateExpression(expression) {

  // Enum concept used
  const operators = {
    plus: '+',
    minus: '-',
    into: '*',
    // Add more operators if needed
  };

  // using regex to extract the expression
  const expExtract = expression.replace(
    /\/(plus|minus|into)\//g,
    (operator) => operators[operator]
  );
  // eval() evaluates the operation
  const result = eval(expExtract);
  return result;
}

const evalExpression = (req, res) => {
  const operationString = req.params[0];
  const operationParts = operationString.split('/');

  try {
    // calling the function
    answer = evaluateExpression(operationString);
    question = operationParts.join('');
    // modifying for JSON readability
    question = question
      .replaceAll('plus', '+')
      .replaceAll('into', '*')
      .replaceAll('minus', '-');
  } catch (error) {
    res.status(400).json({ error: 'Invalid operation' });
    return;
  }

  // getting the history generated upto 20 entries
  const historyEntry = { question, answer };
  operationsHistory.unshift(historyEntry);
  if (operationsHistory.length > 20) {
    operationsHistory.pop();
  }

  res.json({ question, answer });
};

module.exports = {
  evalExpression,
  operationsHistory,
};
