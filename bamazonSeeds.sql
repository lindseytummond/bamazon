DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  department_name VARCHAR(50) NULL,
  price DECIMAL (5,2) NULL,
  stock_quantity INTEGER (10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toilet paper", "home essentials", 2.99, 100),
("paper towels", "home essentials", 4.99, 50),
("bananas", "grocery", .99, 200),
("coffee", "grocery", 4.99, 70),
("sweat pants", "clothes", 14.99, 300),
("sweat shirts", "clothes", 10.99, 150),
("puzzle", "games", 19.99, 400),
("monopoly", "games", 24.99, 170),
("yoga mat", "exercise", 12.99, 40),
("peloton bike", "exercise", 349.99, 20);