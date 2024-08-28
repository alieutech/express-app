const data = {
    employees: require('../model/employees.json'),
    setEmlpoyees: function (data) { this.employees = data }
};

const getAllEmployees = (req, res) => {
    res.json(data.employees);
};

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    if(!newEmployee.firstname || !newEmployee.lastname) return res.status(400).json({"message": 'Firstname and lastname are required.'});
    data.setEmlpoyees([...data.employees, newEmployee]);
    res.json(data.employees);

}
const updateNewEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(!employee) {
        return res.status(400).json({"message": `employee id ${req.body.id} is not available.`})
    }
    if(req.body.firstname) req.body.firstname = req.body.firstname;
    if(req.body.lastname) req.body.lastname = req.body.lastname;
    const filterArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unSortedArray =[...data.employees, filterArray];
    data.setEmlpoyees(unSortedArray);
    res.json(data.employees)
}

const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(!employee) {
        return res.status(400).json({"message":`Employee ${req.body.id}`})
    }
    const filterArray = data.employees.filter(emp = emp.id !== parseInt(req.body.id));
    data.setEmlpoyees([filterArray, employee]);
    res.status(200).json({"success": `Employee ${data.employees} is deleted.`})

} 

module.exports = { getAllEmployees, updateNewEmployee,  createNewEmployee, deleteEmployee };