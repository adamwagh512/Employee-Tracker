const inquirer = require("inquirer");
const Choices = require("inquirer/lib/objects/choices");
const query = require('./db/config')

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuChoice",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ]).then((answers) => {
      const menuChoice = answers.menuChoice;

      switch (menuChoice) {
        case "View all departments":
          query.viewAllDepartments();
          break;

        case "View all roles":
          query.viewAllRoles();
          break;

        case "View all employees":
          query.viewAllEmployees();
          break;

        case "Add a department":
          query.addDepartment();
          break;

        case "Add a role":
          query.addRole();
          break;

        case "Add an employee":
          query.addEmployee();
          break;

        case "Update an employee role":
          query.updateRole();
          break;
      }
    })
    
}
mainMenu();