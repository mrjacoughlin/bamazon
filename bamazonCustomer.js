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
// .then checking to see if the inventory is instock.

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
// if the item is instock, we then prompt the user for the quantity,
// if not in stock then load the product inventory.

function promtCustomerForQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you Like to Purchase[Quit with Q]",
        validate: function (val) {
          return val > 0 || val.toLowerCase() === "q";
        },
      },
    ])
    .then(function (val) {
      checkIfShouldExit(val.quantity);
      var quantity = parseInt(val.quantity);
      if (quantity > product.stock_quantity) {
        console.log("/nInsufficient quantity!");
        loadProducts();
      } else {
        makePurchase(product, quantity);
      }
    });
}
// First we check to see if the user would like to quit,
// If there is insufficient product inform user and loadproducts,
// If that is not the case then makePurchase with product info and quantity.

function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ?, product_sales = product_sales + ? WHERE item_id = ?",
    [quantity, product.price * quantity, product.item_id],
    function (err, res) {
      console.log(
        "/nSuccessfull Purchase" + quantity + " " + product.product_name + "'s!"
      );
      loadProducts();
    }
  );
}
// This function allows the user to buy the desired quantity,
// Then lets the user know if the purchase was successfull and updates the database.

function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      return inventory[i];
    }
  }
  return null;
}
//This function will check to see if the product is within the inventory,
// if found return Inventory

function checkIfShouldExit(choice) {
  if (choice.toLowerCase() === "q") {
    console.log("Thank you For Shopping, GoodBye");
    process.exit(0);
  }
}
// Function to see if the user would like to exit the program
