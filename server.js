const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("console.table");

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
          case "View roles":
            viewRoles();
            break;
          case "View employees":
            viewEmployees();
            break;
          case "Add a department":
            addDepartment();
            break;
          case "Add a role":
            addRole();
            break;
          case "Add an employee":
            addEmployee();
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

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "first"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "last"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "role"
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "manager"
      }
    ])
    .then(function(data) {

      
      connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [data.first, data.name, data.role, data.manager], function(err, res) {
        if (err) throw err;
        console.table(res);
        runQuestions();
      });
    });
}

function addDepartment() {
    inquirer.prompt({
      
        type: "input",
        message: "What is the name of the department?",
        name: "dept"

    }).then(function(data){

        connection.query("INSERT INTO department (name) VALUES (?)", [data.dept] , function(err, res) {
            if (err) throw err;
            console.table(res)
            runQuestions();
    })
    })
}

function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What's the name of the role?",
          name: "role"
        },
        {
          type: "input",
          message: "What is the salary for this role?",
          name: "salary"
        },
        {
          type: "input",
          message: "What is the department number?",
          name: "dept"
        }
      ])
      .then(function(data) {
  
  
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [data.role, data.salary, data.dept], function(err, res) {
          if (err) throw err;
          console.table(res);
          runQuestions();
        });
      });
  }

function viewEmployees() {
  let query = "SELECT * FROM employee";
  connection.query(query, function(err, data) {
    if (err) throw err;
    console.table(data);
    runQuestions();
  });
}

function viewRoles() {
  let query = "SELECT * FROM role";
  connection.query(query, function(err, data) {
    if (err) throw err;
    console.table(data);
    runQuestions();
  });
}


function quit() {
  connection.end();
  process.exit();
  }