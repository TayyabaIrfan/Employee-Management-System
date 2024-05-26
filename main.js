import inquirer from 'inquirer';
let employeeManagementSystem = [];
const mainMenu = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: ['View Employees', 'Edit Employee', 'Update Employee', 'Delete Employee', 'Exit']
        }
    ]);
    switch (answers.action) {
        case 'View Employees':
            console.log(employeeManagementSystem);
            break;
        case 'Edit Employee':
            await editEmployee();
            break;
        case 'Update Employee':
            await updateEmployee();
            break;
        case 'Delete Employee':
            await deleteEmployee();
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }
    mainMenu();
};
const editEmployee = async () => {
    const answers = await inquirer.prompt([
        { name: 'employeeId', message: 'Enter employee ID:', type: 'number' },
        { name: 'employeeName', message: 'Enter employee name:', type: 'input' },
        { name: 'salary', message: 'Enter salary:', type: 'number' },
        { name: 'employeeRank', message: 'Enter employee rank:', type: 'input' },
        { name: 'employeeStatus', message: 'Enter employee status:', type: 'input' }
    ]);
    const newEmployee = {
        employeeId: answers.employeeId,
        employeeName: answers.employeeName,
        salary: answers.salary,
        employeeRank: answers.employeeRank,
        employeeStatus: answers.employeeStatus
    };
    employeeManagementSystem.push(newEmployee);
    console.log('Employee edit successfully!');
};
const updateEmployee = async () => {
    const { employeeId } = await inquirer.prompt([
        { name: 'employeeId', message: 'Enter employee ID to update:', type: 'number' }
    ]);
    const employee = employeeManagementSystem.find(emp => emp.employeeId === employeeId);
    if (!employee) {
        console.log('Employee not found!');
        return;
    }
    const answers = await inquirer.prompt([
        { name: 'employeeName', message: `Enter new name (current: ${employee.employeeName}):`, type: 'input' },
        { name: 'salary', message: `Enter new salary (current: ${employee.salary}):`, type: 'number' },
        { name: 'employeeRank', message: `Enter new rank (current: ${employee.employeeRank}):`, type: 'input' },
        { name: 'employeeStatus', message: `Enter new status (current: ${employee.employeeStatus}):`, type: 'input' }
    ]);
    employee.employeeName = answers.employeeName;
    employee.salary = answers.salary;
    employee.employeeRank = answers.employeeRank;
    employee.employeeStatus = answers.employeeStatus;
    console.log('Employee updated successfully!');
};
const deleteEmployee = async () => {
    const { employeeId } = await inquirer.prompt([
        { name: 'employeeId', message: 'Enter employee ID to delete:', type: 'number' }
    ]);
    const index = employeeManagementSystem.findIndex(emp => emp.employeeId === employeeId);
    if (index === -1) {
        console.log('Employee not found!');
        return;
    }
    employeeManagementSystem.splice(index, 1);
    console.log('Employee deleted successfully!');
};
mainMenu();
