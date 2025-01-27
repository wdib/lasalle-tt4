// Step 2.1
const employee_list = [
  { id : 1, name : 'Alice',   department : 'Engineering', salary : 85000 },
  { id : 2, name : 'Bob',     department : 'Marketing',   salary : 60000 },
  { id : 3, name : 'Charlie', department : 'Engineering', salary : 95000 },
  { id : 4, name : 'David',   department : 'HR',          salary : 45000 },
  { id : 5, name : 'Eve',     department : 'Marketing',   salary : 70000 },
];

// Step 2.2
const getEmployeesByDepartmentFn = ( department_name ) => {
  let
    employee_count = employee_list.length,
    match_list     = [],
    employee_obj, i
  ;
  for ( i = 0; i < employee_count; i++ ) {
    employee_obj = employee_list[ i ];
    if ( employee_obj.department === department_name ) {
      match_list.push( employee_obj );
    }
  }
  return match_list;
};

// Step 2.3
export { employee_list, getEmployeesByDepartmentFn };