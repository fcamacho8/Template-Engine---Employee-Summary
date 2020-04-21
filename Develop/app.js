const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamArray = [];

function startQuestions() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "role",
                message: "What is your role? Please choose one: ",
                choices: ["Intern", "Engineer", "Manager"],
            }
        ]).then(ans => {

            if (ans.role === "Engineer") {
                engineerQuestions();
            } else if (ans.role === "Manager") {
                managerQuestions();
            } else {
                internQuestions();
            }
        })
}


function internQuestions() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter your name: "
        },

        {
            type: "input",
            name: "email",
            message: "Please enter your email: "
        },
        {
            type: "input",
            name: "school",
            message: "Please enter your school: "
        }
    ]).then(ans => {
        var createIntern = new Intern(ans.name, teamArray.length + 1, ans.email, ans.school);
        teamArray.push(createIntern);
        console.log(createIntern);
        addEmployee();
    })
}

function engineerQuestions() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is your name? "
            },
            {
                type: "input",
                name: "email",
                message: "Please enter your email: "
            },
            {
                type: "input",
                name: "github",
                message: "Please enter your Github: "
            }
        ]).then(ans => {
            var createEngineer = new Engineer(ans.name, teamArray.length + 1, ans.email, ans.github)
            teamArray.push(createEngineer)
            console.log(createEngineer);
            addEmployee();
        })


}

function managerQuestions() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter your name: "
        },
        {
            type: "input",
            name: "email",
            message: "Please enter your email: "
        },
        {
            type: "input",
            name: "office",
            message: "Please enter your office number: "
        }
    ]).then(ans => {
        var createManager = new Manager(ans.name, teamArray.length + 1, ans.email, ans.office);
        teamArray.push(createManager);
        console.log(createManager);
        addEmployee();
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "addEmployee",
            message: "Would you want to add a new employee? ",
        }
    ]).then(ans => {
        if (ans.addEmployee === true) {
            startQuestions()
        } else {
            var profile = render(teamArray);
            console.log(profile)
            fs.writeFile(outputPath, profile, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("Success");
            })

        }
    })

}
startQuestions();




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
