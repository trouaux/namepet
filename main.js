const program = require('commander');
const process = require("process")

program // node main.js add
    .command('add')
    .description('')
    .action(() => {
        // process.stdin.setEncoding('utf8')
        process.stdin.on('data', data => {
            run(data)
            process.exit()
        })
    });

program //node main.js get name
    .command('get')
    .argument('<name>', '')
    .description('')
    .action((name) => {
        get(name)
    })

program //node main.js ask data
    .command('ask')
    .argument('<data>', '')
    .description('')
    .action((data) => {
        get(data)
    })

program.parse(process.argv);

function add(input){
    console.log(input)
}

function ask(data){
    console.log(data)
}

function get(name){
    console.log(name)
}