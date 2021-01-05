DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT DEFAULT 0,
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Sun Glasses","Accessories",10, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Watch", "Accesories", 50, 150);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Tv", "Electronics", 200, 60);


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Xbox One", "Electronics", 100, 12);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Mens Jeans", "Clothes",25, 1000);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Womens Jeans", "Clothes",50, 2000);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Mens T-shirts", "Clothes",10, 500);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Womens Tops", "Clothes",25, 700);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Sofa", "Furniture", 350, 10);