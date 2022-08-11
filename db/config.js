// get the client
const inquirer = require ('inquirer')
// const { default: inquirer } = require("inquirer");
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employee_db",
  password: "Zdc92t512!",
});

// simple query
function viewAllDepartments() {
  connection.query("SELECT * FROM `department`", function (err, results) {
    console.table(results); // results contains rows returned by server
    return;
  });
}

// with placeholder
function viewAllRoles() {
  connection.query(
    "SELECT title, salary, name FROM `roles` LEFT JOIN department ON department.id = roles.department_id",

    function (err, results) {
      console.table(results);
    }
  );
}

function viewAllEmployees() {
  connection.query(
    // "SELECT title, salary, name FROM `roles` LEFT JOIN department ON department.id = roles.department_id",
    "SELECT employee.id, first_name, last_name, title, salary, manager_id FROM `employee` JOIN roles ON roles.id = employee.role_id",
    function (err, results) {
    console.table(results);
    }
  );
}

function addDepartment() {
  inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What department would you like to add'
      }
    ]).then(answers => {
      console.log(answers)
      connection.query(
        "INSERT INTO department SET ?", answers)
          // name: answers.addDepartment
       
    })
    };

    function addRole() {
      inquirer.prompt([
        {
          type: 'input',
          name:'title',
          message: 'What roll would you like to add?'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the Salary for this role?'
        },
        {
          type: 'list',
          name: 'department',
          message: 'Which department does this role belong to?',
          choices: [``]

        }
      ])
    }

module.exports = {
  connection,
  viewAllDepartments,
  viewAllRoles,
  addDepartment,
  viewAllEmployees,
  addRole
};
