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
  if (err) {
    console.error("error connecting: " + err.stack);
  }

  loadProducts();
});

function loadProducts() {
  connection.query(" SELECT * FROM products", function (err, res) {
    if (err) throw err;
    //console.table gives you the table of results in the terminal
    console.table(results);
    //This promts the user for their choice and passes them through promptCustomerForItem(res)
    promptCustomerForItem(res);
  });
}
// Next we will be promting the customer for an item id,
// .Then checking to see if the inventory is instock.

function promptCustomerForItem(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message:
          "What is the Item ID you would like to Purchase? [Quit with Q]",
        validate: function (val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        },
      },
    ])
    .then(function (val) {
      checkIfShouldExit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);
      if (product) {
        promtCustomerForQuantity(product);
      } else {
        console.log("/nThat item is not currently in stock");
        loadProducts();
      }
    });
}
// The above code asks the user what item by id they would like to select,
// if the item is instock, we then ask the user for the quantity,
// if not in stock then load the product inventory.

//   inquirer
//     .prompt([
//       {
//         name: "choice",
//         type: "rawlist",
//         choices: function () {
//           var choiceArray = [];
//           for (var i = 0; i < results.length; i++) {
//             choiceArray.push(results[i].product_name);
//           }
//           return choiceArray;
//         },
//         message: " What item would you like to buy",
//       },
//       {
//         name: "units",
//         type: "input",
//         message: "How many units would you like to buy",
//       },
//     ])
//     .then(function (answer) {
//       var chosenItem;
//       for (var i = 0; i < results.length; i++) {
//         if (results[i].product_name === answer.choice) {
//           chosenItem = results[i];
//         }
//       }
//       if (chosenItem.stock_quantity < parseInt(answer.unit)) {
//         connection.query(
//           "UPDATE products SET ? WHERE ?",
//           [
//             {
//               stock_quantity: answer.units,
//             },
//             {
//               item_id: chosenItem.item_id,
//             },
//           ],
//           function (err) {
//             if (err) throw err;
//             console.log("Your Purchase was Succesful");
//             start();
//           }
//         );
//       } else {
//         console.log("Not enough units availible. Try a different amount");
//         start();
//       }
//     });
// });
