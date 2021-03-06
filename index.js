const inquirer = require("inquirer");
// const { allowedNodeEnvironmentFlags } = require("process");
const db = require('./db/connections');
const cTable = require('console.table');

// -Start questions============================================================================================
function startDatabase () {
  inquirer
  .prompt({
  type: 'list',
  name: 'tables',
  message: ' select an option',
  choices: [ 'view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role' ]
  })
  .then((res) => {
  switch(res.tables) {
    case 'view all departments': viewAllDepartments(); 
    break;
    case 'view all roles': viewAllRoles();
    break;
    case 'view all employees': viewAllEmployees();
    break;
    case 'add a department': addDepartment();
    break;  
    case 'add a role': addRole();
    break;  
    case 'add an employee': addEmployee();
    break;
    case 'update an employee role': updateEmployee();
    break;
    default: console.log('Select a valid option !')
    } 
  });
}
//  End Questions

// Begin Query functions ===================================================================================

// All departments 
viewAllDepartments = () => {  
const sql = `SELECT * FROM department`
db.query(sql, (err, res) => {
  // console.log(res)
  if(err){
    console.log(err)
  }console.log(cTable.getTable(res));
  });
  startDatabase();
}

// All Roles ----------------------------------------------------------------------------------------------
viewAllRoles = () => {
  const sql = `SELECT roles.id, department.department_name, roles.title, roles.salary FROM department
              LEFT JOIN  roles
              ON roles.department_id = department.id;
  `
  db.query(sql, (err, res) => {
    // console.log(res)
    if(err){
      console.log(err)
    }console.log(cTable.getTable(res));
    });
    startDatabase()
}

// All Employees --------------------------------------------------------------------------------------
viewAllEmployees = () => {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name,
              department.department_name as department,
              roles.salary, roles.title,
              manager.last_name as manager
              FROM employee
              LEFT JOIN employee manager on manager.id = employee.manager_id
              LEFT JOIN roles  
              ON employee.role_id  = roles.id
              LEFT JOIN department
              ON  department.id = roles.department_id 
              
  `
  db.query(sql, (err, res) => {
    // console.log(res)
    if(err){
      console.log(err)
    }console.log(cTable.getTable(res));
    });
    startDatabase()
}

// add department ---------------------------------------------------------------------------------
addDepartment = () => {  
  inquirer.prompt({
    type: "input",
    message: "what departments do you want to add ?",
    name: "new_department"
  }).then (deptdata => {

  db.query(  `INSERT INTO department (department_name)
              VALUES (?)`,deptdata.new_department,
               (err, res) => {
    // console.log(res)
    if(err){
      console.log(err)
    }console.log(cTable.getTable(res));
    });
    startDatabase();
    }
  )}


  
// add role ---------------------------------------------------------------------------------
addRole = () => {  
  inquirer.prompt({
    type: "input",
    message: "  Enter the role name title, salary, and department id number ",
    name: "new_role"
  }).then (deptdata => {

  db.query(  `INSERT INTO roles (title, salary, department_id)
              VALUES (?)`,deptdata.new_role,
               (err, res) => {
    // console.log(res)
    if(err){
      console.log(err)
    }console.log(cTable.getTable(res));
    });
    startDatabase();
    }
  )}

  // add employee
  // ou will need to collect this new values from inquirer and
  //  then you could say [value1,value2,value3,value4] then you use that array
// 1:42
// IMPORTANT: you numbers need to be numbers not strings
  addEmployee = () => {  
    inquirer.prompt({
      type: "input",
      message: "  Enter the employee first name, last name, role id and manger id ",
      name: "new_employee"
    }).then (deptdata => {
      let data = deptdata.new_employee.split(", ")
    db.query(  `INSERT INTO employee SET ?
                VALUES (?)`,data,
                 (err, res) => {
      console.log(data)
      if(err){
        console.log(err)
      }console.log(cTable.getTable(res));
      });
      startDatabase();
      }
    )}


// update employee role 
 updateEmployee = () => {
   inquirer.prompt({
     type: "input",
     message: "enter the "
   })
 }

// / UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;)


//  by view by Manager ID ---------------------------------------------------------------------------
// viewEmployeesByManagerId = () => {
//   inquirer.prompt([{
//     type: "input",
//     name: "manager_id",
//     message: "Enter the employee manager id"
//   }]).then(answeres => {
//     // This is your validation
//     if(answeres.manager_id === 0 || answeres.manager_id === ""){
//       console.log(`Please enter a valid manager id`);
//       return this.viewEmployeesByManagerId();
//     }
//     //Validation END

//     //Send sql query
//     const sql = `SELECT * FROM employee WHERE manager_id = ?`
//     //Create connection
//     db.query(sql, [answeres.manager_id], (err, data) => {
//       //Handle errors
//       if(err) throw err
//       //Return data
//       console.log(cTable.getTable(data));

//     })
//   })
// }



// Initiate Application =========================================================================
startDatabase();