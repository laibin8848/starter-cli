import program from 'commander';
import { VERSION, COMMAND } from './utils/constants';
import apply from './index';
import chalk from 'chalk';


let actionMap = {
    init: {
        description: 'start new project',
        usages: [
            COMMAND + ' init projectName'
        ]
    },
    config: {
        alias: 'cfg',
        description: 'config .'+ COMMAND +'rc',
        usages: [
            COMMAND + ' config set <k> <v>',
            COMMAND + ' config get <k>',
            COMMAND + ' config remove <k>'
        ]
        
    },
    page: {
        alias: 'pg',
        description: 'quickly add/rm one dynamic module of the project',
        usages: [
            COMMAND + ' page add moduleName',
            COMMAND + ' page rm moduleName'
        ]
    }
}

Object.keys(actionMap).forEach((action) => {
    program.command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias)
    .action(() => {
        switch (action) {
            case 'config': 
                apply(action, ...process.argv.slice(3));
                break;
            case 'init':
                apply(action, ...process.argv.slice(3));
                break;
            case 'page':
                apply(action, ...process.argv.slice(3));
                break;
            default:
                break;
        }
    });
});

function help() {
    console.log('\r\nUsage:');
    Object.keys(actionMap).forEach((action) => {
        actionMap[action].usages.forEach(usage => {
            console.log('  - ' + usage);
        });
    });
    console.log('\r');
}


program.usage('<command> [options]');
program.on('-h', help);
program.on('--help', help);
program.version(VERSION, '-V --version').parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp(make_green);
}
function make_green(txt) {
    return chalk.green(txt); 
}