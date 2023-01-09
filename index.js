// *** Import HTML generator *** //
const generateHTML = require('./src/generateHTML');


// Include packages needed for this application
// // *** Import all empoloyee classes *** //
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern'); 

// node modules 
const fs = require('fs'); 
const inquirer = require('inquirer');

let manager;
//holds mamanger, engineer, intern and Employee information
const teamMembersArr = [];

inquirer.prompt([
    {
        message: "Welcome! Please enter team manager's name.",
        type: "input",
        name: "managerName",
        // Add validation to make sure user entered the input
        validate: (answer) => {
            if (answer !== "") {
                return true;
            }
            else {
                return "Still wating on manager's name";
            }
        }
    },
    {
        message: "Enter manager's employee id?",
        type: "input",
        name: "id",
        // Add validation to make sure user entered the input
        validate: nameInput => {
            if  (isNaN(nameInput)) {
                console.log ("Please enter a valid number ID")
                return false; 
            } else {
                return true;
            }
        }
    },
    {
        message: "Enter manager's email address?",
        type: "input",
        name: "email",
        // Add validation to make sure user entered the input
        validate: (answer) => {
            const isEmail = answer.match(/\S+@\S+\.\S+/);
            if (isEmail) {
                return true;
            }
            else {
                return "Please enter a valid email address.";
            }
        }
    },
    {
        message: "Enter manager's office number?",
        type: "input",
        name: "officeNumver",
        // Add validation to make sure user entered the input
        validate: (answer) => {
            const isNumber = answer.match(/^[1-9]\d*$/);
            if (isNumber) {
                return true;
            }
            else {
                return "Please enter only numbers for office number.";
            }
        }
    },
    {
        message: "Do you want to add engineer, or intern, or finish building your team?",
        type: "list",
        choices: ["Add Engineer", "Add Intern", "Finish creating team"],
        name: "options"
    }
]).then(response => {
    // Creates manager object from constructor object
    manager = new Manager(response.managerName, response.id, response.email, response.officeNumber);
    teamMembersArr.push(manager)
    moreTeammateOrDone(response.options);
}).catch(error => {
    console.log(error);
});

// Handles the user choice to add engineer or intern or finish the team creating

function moreTeammateOrDone(options) {
    //run functions based on options we pick in question.
    switch (options) {
        case "Add Engineer":
            addEngineer();
            break;

        case "Add Intern":
            addIntern();
            break;

        case "Finish creating team":
            finishTeamBuilding();
    }
}

// Prompts questions for the user to enter engineer information and adds an engineer.

function addEngineer() {
    inquirer.prompt([
        {
            message: "Welcome! please enter engineer name.",
            type: "input",
            name: "engineerName",
            // Add validation to make sure user entered the input
            validate: (answer) => {
                if (answer !== "") {
                    return true;
                }
                else {
                    return "Please enter engineer name";
                }
            }
        },
        {
            message: "Enter engineer id?",
            type: "input",
            name: "id",
            // Add validation to make sure user entered the input
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("Please enter a valid number ID")
                    return false; 
                } else {
                    return true;
                }
            }
        },
        {
            message: "Enter engineer email address?",
            type: "input",
            name: "email",
            // Add validation to make sure user entered the input
            validate: (answer) => {
                const isEmail = answer.match(/\S+@\S+\.\S+/);
                if (isEmail) {
                    return true;
                }
                else {
                    return "Please enter a valid email address.";
                }
            }
        },
        {
            message: "Enter engineer's Github username.",
            type: "input",
            name: "github",
            // Add validation to make sure user entered the input
            validate: (answer) => {
                if (answer !== "") {
                    return true;
                }
                else {
                    return "Please enter Github username";
                }
            }
        },
        {
            message: "Do you want to add an engineer, or an intern, or finish building your team?",
            type: "list",
            choices: ["Add Engineer", "Add Intern", "Finish creating team"],
            name: "options"
        }
    ]).then(response => {
        const engineer = new Engineer(response.engineerName, response.id, response.email, response.github);
        // engineers.push(engineer);
        teamMembersArr.push(engineer)
        moreTeammateOrDone(response.options);
    });
}

// Prompts question for user to enter intern information and adds that intern
function addIntern() {
    inquirer.prompt([
        {
            message: "Welcome! please enter intern name.",
            type: "input",
            name: "internName",
            // Add validation to make sure user entered the input
            validate: (answer) => {
                if (answer !== "") {
                    return true;
                }
                else {
                    return "Please enter intern name";
                }
            }
        },
        {
            message: "Enter intern id?",
            type: "input",
            name: "id",
            // Add validation to make sure user entered the input
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("Please enter a valid number ID")
                    return false; 
                } else {
                    return true;
                }
            }
        },
        {
            message: "Enter intern email address?",
            type: "input",
            name: "email",
            // Add validation to make sure user entered the input
            validate: (answer) => {
                const isEmail = answer.match(/\S+@\S+\.\S+/);
                if (isEmail) {
                    return true;
                }
                else {
                    return "Please enter a valid email address.";
                }
            }
        },
        {
            message: "Enter intern's school?",
            type: "input",
            name: "school",
            // Add validation to make sure user entered the input
            validate: (answer) => {
                if (answer !== "") {
                    return true;
                }
                else {
                    return "Please enter school name";
                }
            }
        },
        {
            message: "Do you want to add an engineer, or an intern, or finish building your team?",
            type: "list",
            choices: ["Add Engineer", "Add Intern", "Finish creating team"],
            name: "options"
        }
    ]).then(response => {
        const intern = new Intern(response.internName, response.id, response.email, response.school);
        teamMembersArr.push(intern)
        moreTeammateOrDone(response.options);
    });
}

// Generates the HTML file
function finishTeamBuilding() {
    const htmlText = generateHTML(teamMembersArr)

    fs.writeFile("./dist/index.html", htmlText, err =>
        err ? console.log(err) : console.log("Successfully created webpage containing team info!"));
}

