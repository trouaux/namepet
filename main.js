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

        var input = [];

        rl.prompt();

        rl.on('line', function (cmd) {
            input.push(cmd);
            if (cmd == ""){ // bad idea
                rl.close()
            }
        });

        rl.on('close', function (cmd) {
            add(input.join('\n'));
            process.exit(0);
        });
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

function run(){

}