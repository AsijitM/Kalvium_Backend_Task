const { operationsHistory } = require("./getOperations");

// function to collect the History from the server
const getHistory = (req, res) => {
  const historyList = operationsHistory.map(
    (entry) => `${entry.question} = ${entry.answer}`
  );
  // reversing the list so that it gets in a order
  historyList.reverse()


  const historyData = {
    operations: historyList
  }
  // res.send(
  //   `<h1>Operations History</h1><ul>${historyList
  //     .map((item) => `<li>${item}</li>`)
  //     .join('')}</ul>`
  // );


  // rendering the ejs file
  res.render('history',historyData)
};

module.exports = {
  getHistory,
};
