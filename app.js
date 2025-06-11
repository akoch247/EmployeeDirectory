import express from "express"

//create the express app
const app = express();

//export the app
export default app;
import employees from "./db/employees";


let lastRandomIndex = -1;

// GET / to send the message "Hello Employees!"
app.route("/").get((req, res) => {
    res.send("Hello employees!");
});

// GET / employees returns the list of employees
app.route("/employees").get((req, res) => {
    res.send(employees);
});

// GET / employees/:id sends employee #1 and 404 message
app.route("/employees/:id").get((req, res) => {
    const {id} = req.params
    const employee = employees.find(employee => employee.id === Number(id));

    if (employee) {
        res.status(200).send(employee);
    } else {
        res.status(404).send({ error: "Employee not found "});
    }
});

// GET /empoyees/random sends a random employee from the array
// GET /employees/random > sends an employee with ID and name
//  GET /employees/random > does not send the same employee twice in a row

app.route("/employees/random").get((req, res) => {
    if (employees.length === 0) {

     return res.status(404).send({ error: "Employee not found"});
    } 
if (employees.length === 1) {
    lastRandomIndex = 0;
    const employee = employees[0];
    return res.send({ id: employee.id, name: employee.name });
    }

    let randomIndex= Math.floor(Math.random() * employees.length);

    if (randomIndex === lastRandomIndex) {
        randomIndex = (randomIndex + 1) % employees.length;
    }

    lastRandomIndex = randomIndex;
    const employee = employees[randomIndex];
    res.send({ id: employee.id, name: employee.name });

});
