#! /usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from 'chalk';
console.log(chalk.bold.white(`\t\n<===========> ${chalk.bold.underline.bgWhite('Countdown Timer')} <===========>\n`));
const user = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: "Enter your Countdown Limit is Second:",
        validate: (input) => {
            if (isNaN(input)) {
                return `Please enter valid 'Number'`;
            }
            else if (input > 60) {
                return "Please Seconds under 60";
            }
            else {
                return true;
            }
        },
    },
]);
let input = user.userInput;
function startTime(value) {
    const instTime = new Date().setSeconds(new Date().getSeconds() + value);
    const inSetTime = new Date(instTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDifference = differenceInSeconds(inSetTime, currentTime);
        if (timeDifference <= 0) {
            console.log(chalk.bold.green("\n\tComplete."));
            process.exit();
        }
        const min = Math.floor((timeDifference % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDifference % 60);
        console.log(chalk.bold.red(`\n\t${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
    }, 1000);
}
startTime(input);
