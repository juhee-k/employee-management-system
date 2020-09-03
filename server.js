// Dependencies
const inquirer = require('inquirer');
const db = require("./db");

//Prompts
const addPrompts = {
    employee: [
    {
        message: "What is the employee's first name?",
        name: "first_name"
    },
    {
        message: "What is the employee's last name?",
        name: "last_name"
    },
    {
        message: "What is the employee's role-id?",
        name: "role_id"
    },
    {
        message: "What is the employee's manager-id?",
        name: "manager_id"
    }
    ],
    role: [
        {
            message: "What is the employee's role?",
            name: "title"
        },
        {
            message: "What is the employee's salary?",
            name: "salary"
        },
        {
            message: "What is the employee's department?",
            name: "department_id"
        }
    ],
    department: [
        {
            message: "What is the department's name?",
            name: "name"
        }
    ]
};

// const updatePrompts = {
//     role: [
//         {
//             type: "input",
//             name: "updateEmpRole",
//             message: "Which employee would you like to update?"
//           },
//           {
//             type: "number",
//             message: "Enter the new role ID:",
//             name: "role_id"
//           }
//     ]
// }

const addNew = table => {
    inquirer.prompt(addPrompts[table])
        .then(data => db.createNew(table, data)
        .then(response => console.log(response)));
};

// const updateExisting = table => {
//     inquirer.prompt(updatePrompts[table])
//         .then(data => db.updateData(table, data)
//         .then(response => console.log(response)));
// };

// Inquirer prompt and promise
const main = function() {
  inquirer
    .prompt({
      type: "list",
      name: "select",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Role",
        "Remove Employee",
        "Quit"
      ]
    })
    .then(function(answer) {
      console.log(answer);
      // start of switch statment for user choice
      switch (answer.main) {
        case "View All Employees":
        return db.getAll("employee");
        break;

        case "View All Roles":
        return db.getAll("role");
        break;

        case "View All Departments":
        return db.getAll("department");
        break;

        case "Add Employee":
        addNew("employee")
        break;

        case "Add Department":
        addNew("department");
        break;

        case "Add Role":
        addNew("role");
        break;

        // case "Update Employee Role":
        // updateData("employee");
        // break;
      }
    });
};
main();

