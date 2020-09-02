const inquirer = require('inquirer');
const db = require("./db");
//prompts
const addPrompts = {
    employee: [
    {
        message: "What is their first name?",
        name: "first_name"
    },
    {
        message: "What is their last name?",
        name: "last_name"
    },
    {
        message: "Enter their role id",
        name: "role_id"
    },
    {
        message: "Enter their manager's employee id",
        name: "manager_id"
    }
    ],
    role: [
        {
            message: "Enter the role title",
            name: "title"
        },
        {
            message: "Enter the salary",
            name: "salary"
        },
        {
            message: "Enter the department id",
            name: "department_id"
        }
    ]
}

const addNew = table => {
    inquirer.prompt(addPrompts[table])
        .then(data => db.createNew(table, data)
        .then(response => console.log(response)));
};

const update = table => {
    inquirer.prompt(addPrompts[table])
        .then(data => db.createNew(table, data)
        .then(response => console.log(response)));
}

const main = () => {
    inquirer.prompt({
        message: "What would you like to do?",
        type: "list",
        name: "choice",
 "       choices: ["Add Employee", "Remove Employee", "Update Employee", "Update Employee Manager", "View All Roles", "Add Role", "Remove Role"]
    }).then(({choice})=> {
        switch(choice){
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
            case "Add Role":
                addNew("role");
                break;
        }
    }).then(data=> data ? console.table(data) : "")
}

const dept = () => {
    inquirer.prompt({
        message: "Which department would you like to see employees for?",
        type: "list",
        name: "choice",
 "       choices: ["Sales", "Engineering", "Finance", "Legal"]
    }).then(({choice})=> {
        switch(choice){
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
            case "Add Role":
                addNew("role");
                break;
        }
    }).then(data=> data ? console.table(data) : "")
}


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  createProduct();
});

function createProduct() {
  console.log("Inserting a new product...\n");
  var query = connection.query(
    "INSERT INTO products SET ?",
    {
      flavor: "Rocky Road",
      price: 3.0,
      quantity: 50
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      updateProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function updateProduct() {
  console.log("Updating all Rocky Road quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        quantity: 100
      },
      {
        flavor: "Rocky Road"
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function deleteProduct() {
  console.log("Deleting all strawberry icecream...\n");
  connection.query(
    "DELETE FROM products WHERE ?",
    {
      flavor: "strawberry"
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products deleted!\n");
      // Call readProducts AFTER the DELETE completes
      readProducts();
    }
  );
}

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}
