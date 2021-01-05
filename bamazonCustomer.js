var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "bamazon_DB",
});

connection.connect(function (err) {
  if (err) throw err;

  start();
});

function start() {
  connection.query(" SELECT * FROM products", function (err, results) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "choice",
        type: "rawlist",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].product_name);
          }
          return choiceArray;
        },
        message: " What item would you like to buy",
      },
      {
        name: "units",
        type: "input",
        message: "How many units would you like to buy",
      },
    ]);
  });
}
