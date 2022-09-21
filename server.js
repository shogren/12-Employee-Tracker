const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    insecureAuth: true,
    user: "root",
    password: "C0lemeonthepanny$ty$",
    database: "employeeDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected to db " + connection.threadId);
  
    runQuestions();
  });

function runQuestions() {
    inquirer
      .prompt({
        type: "list",
        choices: [
          "Add a department",
          "Add a role",
          "Add an employee",
          "View departments",
          "View roles",
          "View employees",
          "Update employee role",
          "Quit"
        ],
        message: "What would you like to do?",
        name: "option"
      })
      .then(function(result) {
        console.log("User chose: " + result.option);
  
        switch (result.option) {
          case "View departments":
            // viewDepartments();
            break;
          case "View all roles":
            // viewRoles();
            break;
          case "View all employees":
            // viewEmployees();
            break;
          case "Add a department":
            addDepartment();
            break;
          case "Add a role":
            addRole();
            break;
          case "Add an employee":
            // addEmployee();
            break;
          case "Update employee role":
            // updateEmployee();
            break;
          default:
            quit();
        }
      });
  }

// the functions that run depending on user choice

function addDepartment() {
    inquirer.prompt({
      
        type: "input",
        message: "What is the name of the department?",
        name: "deptName"

    }).then(function(data){

        connection.query("INSERT INTO department (name) VALUES (?)", [data.deptName] , function(err, res) {
            if (err) throw err;
            console.table(res)
            runQuestions()
    })
    })
}

function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What's the name of the role?",
          name: "roleName"
        },
        {
          type: "input",
          message: "What is the salary for this role?",
          name: "salaryTotal"
        },
        {
          type: "input",
          message: "What is the department id number?",
          name: "deptID"
        }
      ])
      .then(function(data) {
  
  
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [data.roleName, data.salaryTotal, data.deptID], function(err, res) {
          if (err) throw err;
          console.table(res);
          runQuestions();
        });
      });
  }