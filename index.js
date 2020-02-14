const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRender");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const employees = [];
const outputDir = path.resolve(__dirname, "../output");
 

const questions = [
    {
        type: "list",
        message: "What is your role?",
        choices: ["manager", "engineer", "intern"],
        name: "role"
    }
];

const questionsManager = [
    {
        type: "input",
        message: "What is your name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is your office number?",
        name: "officeNumber"
    },
    {
        type: "confirm",
        message: "Are there more team members?",
        name: "continue"
    }
];

const questionsEngineer = [
    {
        type: "input",
        message: "What is your name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is your github username?",
        name: "github"
    },
    {
        type: "confirm",
        message: "Are there more team members?",
        name: "continue"
    }
];

const questionsIntern = [
    {
        type: "input",
        message: "What is your name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email"
    },
    {
        type: "input",
        message: "What school are you going to?",
        name: "school"
    },
    {
        type: "confirm",
        message: "Are there more team members?",
        name: "continue"
    }
];

function promptRole(data) 
{
    switch (data.role)
    {
        case "manager":
            inquirer.prompt(questionsManager).then(promptManager);
            break;
        case "engineer":
            inquirer.prompt(questionsEngineer).then(promptEngineer);
            break;
        case "intern":
            inquirer.prompt(questionsIntern).then(promptIntern);
            break;
        default:
            console.log("Please choose a valid option");
            inquirer.prompt(questions).then(promptRole);
    }
}

function promptManager(data)
{
    employees.push(new Manager(data.name, data.id, data.email, data.officeNumber));

    if (data.continue)
    {
        inquirer.prompt(questions).then(promptRole);
    }
    else
    {
        const html = render(employees);

        fs.writeFile(path.join(outputDir, "/index.html"), html, () => {
            console.log("file writen")
        });
    }
}

function promptEngineer(data)
{
    employees.push(new Engineer(data.name, data.id, data.email, data.github));

    if (data.continue)
    {
        inquirer.prompt(questions).then(promptRole);
    }
    else
    {
        const html = render(employees);

        fs.writeFile(path.resolve(outputDir, "index.html"), html, () => {
            console.log("file writen")
        });
    }
}

function promptIntern(data)
{
    employees.push(new Intern(data.name, data.id, data.email, data.school));

    if (data.continue)
    {
        inquirer.prompt(questions).then(promptRole);
    }
    else
    {
        const html = render(employees);

        fs.writeFile("output/index.html", html, err => {
            if (err) throw err;

            console.log("file writen");
        });
    }
}

inquirer.prompt(questions).then(promptRole);