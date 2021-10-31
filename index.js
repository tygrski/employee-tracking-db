const inquirer = require("inquirer");
// const { allowedNodeEnvironmentFlags } = require("process");
const db = require('./db/connections');
const cTable = require('console.table');

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
    case 'add a departments': addDepartment();
    break;  
    case 'add a roles': addRole();
    break;  
    case 'add an employee': addEmployee();
    break;
    case 'update an employee role': updateEmployee();
    break;
    default: console.log('Select a valid option !')
  } 
});
}

// view all departments, add .then solution.. Make asynchronous
// async function viewAllDepartments() {
// db.query('SELECT * FROM departments', (err, res ) =>{
//    if(err) {
//     //  res.status(400)
//     //  console.table("error")
//    }
//   console.table(res);
// })
// }


viewAllDepartments = () => {
//  
const sql = `SELECT * FROM department`
db.query(sql, (err, res) => {
  // console.log(res)
  if(err){
    console.log(err)
  }console.log(cTable.getTable(res));
  })
}


viewEmployeesByManagerId = () => {
  inquirer.prompt([{
    type: "input",
    name: "manager_id",
    message: "Enter the employee manager id"
  }]).then(answeres => {
    // This is your validation
    if(answeres.manager_id === 0 || answeres.manager_id === ""){
      console.log(`Please enter a valid manager id`);
      return this.viewEmployeesByManagerId();
    }
    //Validation END

    //Send sql query
    const sql = `SELECT * FROM employee WHERE manager_id = ?`
    //Create connection
    db.query(sql, [answeres.manager_id], (err, data) => {
      //Handle errors
      if(err) throw err
      //Return data
      console.log(cTable.getTable(data));

    })
  })
}



startDatabase();