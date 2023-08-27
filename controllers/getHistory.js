const { operationsHistory } = require("./getOperations");

const getHistory = (req, res) => {
  const historyList = operationsHistory.map(
    (entry) => `${entry.question} = ${entry.answer}`
  );
  historyList.reverse()

  const historyData = {
    operations: historyList
  }
  // res.send(
  //   `<h1>Operations History</h1><ul>${historyList
  //     .map((item) => `<li>${item}</li>`)
  //     .join('')}</ul>`
  // );

  res.render('history',historyData)
};

module.exports = {
  getHistory,
};
