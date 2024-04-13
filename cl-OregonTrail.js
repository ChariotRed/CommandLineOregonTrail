let inquirer;
let chalk;
let figlet;

(async () => {
    inquirer = await import('inquirer');
    chalk = await import('chalk');
    figlet = await import('figlet');
    console.log(figlet.default.textSync('Oregon Trail'));
    promptNextAction(); 
})();


let day = 0;
let distance = 0;
let food = 50;
let health = 100;
const oregonDistance = 2000;


function displayStatus() {
    console.log(`\nDay: ${day}, Distance: ${distance} miles, Food: ${food} lbs, Health: ${health}%\n`);
}

function travel() {
    day += 1;
    distance += Math.floor(Math.random() * 20 + 10);
    food -= Math.floor(Math.random() * 10 + 5);
    health -= Math.floor(Math.random() * 5);
}

function hunt() {
    food += Math.floor(Math.random() * 15 + 5);
}

function rest() {
    health = Math.min(health + 15, 100);
}

function checkGameOver() {
    if(food <= 0 || health <= 0 || distance >= oregonDistance){
        console.log(figlet.default.textSync('Game Over'));
        if (food <= 0) {
            console.log("You have run out of food and died of starvation.");
            return true;
        } else if (health <= 0) {
            console.log("Your health deteriorated due to poor conditions and you have died.");
            return true;
        } else if (distance >= oregonDistance) {
            console.log(`Congratulations! You reached Oregon in ${day} days.`);
            return true;
        }
    }
    return false;
}


function promptNextAction() {
    displayStatus();
    inquirer.default.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What do you want to do?\n',
            prefix: '',
            choices: [
                { name: 'Travel', value: 'T' },
                { name: 'Hunt', value: 'H' },
                { name: 'Rest', value: 'R' }
            ]
        }
    ]).then((answers) => {
        switch (answers.action) {
            case 'T':
                travel();
                break;
            case 'H':
                hunt();
                break;
            case 'R':
                rest();
                break;
        }
        if (!checkGameOver()) {
            promptNextAction();
        }
    })
}
