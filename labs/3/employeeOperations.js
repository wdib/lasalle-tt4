// Step 3.1
import { employee_list, getEmployeesByDepartmentFn } from './employeeData.js';

// Step 3.2
const addEmployee = ( { id, name, department, salary } ) => {
  employee_list.push( { id, name, department, salary } );
  console.log( `${name} has been added to the ${department} department.` );
};

// Step 3.3
const printEmployeeDetails = ( employee ) => {
  const { id, name, department, salary } = employee;
  console.log(
    `ID: ${id}, Name: ${name}, Department: ${department}, Salary: $${salary}`
  );
};

// Step 3.4
const listEmployeesByDepartment = ( department_name ) => {
  let
    match_list  = getEmployeesByDepartmentFn( department_name ),
    match_count = match_list.length,
    i
  ;
  
  if ( match_list.length === 0 ) {
    console.log( `No employees found in the ${department_name} department.` );
    return;
  }

  console.log( `Employees in the ${department_name} department:` );

  for ( i = 0; i < match_count; i++ ) {
    printEmployeeDetails( match_list[ i ] );
  }
};

// Step 3.5

// Add a new employee
addEmployee(
  { id : 6, name : 'Frank', department : 'Engineering', salary : 105000 }
);

// Listing all employees in the Engineering department
listEmployeesByDepartment( 'Marketing' );