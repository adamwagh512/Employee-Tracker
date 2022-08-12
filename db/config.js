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

    async function addRole() {
      let roles = await (await connection.promise().query(`SELECT name FROM department`))
      let id = await(await connection.promise().query('SELECT id FROM department'))

      var deptId = id[0].map(function(id) {
        return id ['id']
      })
      console.log(deptId)
      var names = roles[0].map(function(roles) {
        return roles['name']
      })
      console.log(names)
      
      inquirer.prompt([
        {
          type: 'input',
          name:'title',
          message: 'What roll would you like to add?'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary for this role?'
        },
        {
          type: 'list',
          name: 'department',
          message: 'Which department does this role belong to?',
          choices: names
        }
      ]).then(answers => {
          console.log(answers)
          connection.query(
            'INSERT INTO roles SET ?', answers.title, answers.salary, 
            answers.department_id //need help with this
          )
      })
    };

    async function addEmployee() {
      let roles = await (await connection.promise().query(`SELECT title FROM roles`))
      let manager = await(await connection.promise().query('SELECT first_name FROM employee'))

      var empRole = roles[0].map(function(title) {
        return title ['title']
      })
      console.log(empRole)

      
      var empManager = manager[0].map(function(first_name) {
        return first_name['first_name']
      })
      console.log(empManager)
      
      inquirer.prompt([
        {
        type:'input',
        name: 'first_name',
        message: "What is the employee's first name?"
        },
        {
          type: 'input',
          name: 'last_name',
          message: "What is the employee's last name?"
        }, 
        {
          type: 'list',
          name: 'role',
          message: "What is this employee's role?",
          choices: empRole
        },
        {
          type: 'list',
          name: 'manager',
          message: "Who is the employee's manager?",
          choices: empManager
        }
      ]);
    }

    async function updateRole() {
      console.log('not here yet')
    }

module.exports = {
  connection,
  viewAllDepartments,
  viewAllRoles,
  addDepartment,
  viewAllEmployees,
  addRole,
  addEmployee,
  updateRole
};
