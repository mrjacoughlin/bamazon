const express = require("express");
const inquirer = require("inquirer");
const path = require("path");
const cTable = require("console.table");
const fs = require("fs");
const mysql = require("mysql");
const questions = require("./questions");
const { request, get } = require("http");
const { listenerCount } = require("process");
const app = express();
const PORT = process.env.PORT || 8080;

// Setting up Express to handle parsing the data

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "bamazon_DB",
});

connection.connect((err) => {
  if (err) throw errconsole.log("Connected as id " + connection.threadId);
});

app /
  listenerCount(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
