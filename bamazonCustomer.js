var mysql = require("mysql");
var inquirer = require("inquirer");
require ('console.table');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "x5y6eLST$",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function to display all items for sale
  function start() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log("------------------------------------------");
        console.log("Welcome to Bamazon!");
        console.log("Please checkout our Online Store for all your Essentials");
        console.log("------------------------------------------");
        console.table(res)
        

        // prompt users with two messages
        inquirer.prompt([
            {
                name: "id",
                type: "number",
                message: "Please enter the Item ID of the item that you would like to buy?",
            },
            {
                name: "quantity",
                type: "number",
                message: "How many would you like to buy?",
            },
        ])

            // add to order
            .then(function (order) {

                var quantity = order.quantity;
                var item_id = order.id;

                connection.query('SELECT * FROM products WHERE item_id=' + item_id, function (err, selectedItem) {
                    if (err) throw err;

                    // check if store has enough of the product to meet the customer's request
                    if (selectedItem[0].stock_quantity - quantity >= 0) {

                        console.log("Quantity in Stock: " + selectedItem[0].stock_quantity);
                        console.log("Order Quantity: " + quantity);
                        console.log("Bamazon has " + selectedItem[0].product_name + " to fill your order!");

                        // total cost of purchase
                        // console.log("Your order total is: " + (order.quantity * selectedItem[0].price).toFixed(2) + " dollars." + "\nThank you for shopping Bamazon!");
                        console.log("Your order total is: " + (order.quantity * selectedItem[0].price).toFixed(2) + " dollars.");

                        // updating the SQL database to reflect the remaining quantity                   
                        connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [selectedItem[0].stock_quantity - quantity, item_id],

                            function (err, inventory) {
                                if (err) throw err;

                                continuePrompt();  // loops prompt again to continue shopping
                            });  

                    }
                    // not enugh inventory warning
                    else {
                        console.log("Insufficient quantity: \nBamazon only has " + selectedItem[0].stock_quantity + " " + selectedItem[0].product_name + " in stock currently. \nPlease make another selection or reduce your quantity.");
                        // loops prompt again to continue shopping
                        continuePrompt();  
                    }
                });
            });
    });
};

function continuePrompt() {
    inquirer.prompt([
        {
          name: "continue",
          type: "list",
          message: "Would you like to do next?",
          choices: ["Continue Shopping", "Exit Store"]
        }
      ])
    .then(data => {
        if(data.continue === "Continue Shopping") {
          start();
        } else {
          console.log("Thank You for shopping Bamazon!");
          connection.end();
        }
    });
};
