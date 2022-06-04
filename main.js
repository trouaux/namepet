const program = require('commander');
const process = require("process")
const readline = require("readline")

program // node main.js add
    .command('add')
    .description('')
    .action(() => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout  
            })

        let userInput = "";

        rl.question("JAM input:\n", function(string){
            userInput = string;
            add(string);
            rl.close();
        })
    });


program //node main.js get name
    .command('get')
    .argument('<name>', '')
    .description('')
    .action((name) => {
        ask(name)
    })

program //node main.js ask data
    .command('ask')
    .argument('<data>', '')
    .description('')
    .action((data) => {
        get(data)
    })

program.parse(process.argv);

function add(jam){
    console.log(jam)
}

function ask(data){
    console.log(data)
}

function get(name){
    console.log(name)
}