import { downloadLocal } from './utils/get';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols';
// const execFn = require('child_process').execSync;

let init = async (projectName) => {
    if (!fs.existsSync(projectName)) {
        inquirer.prompt([
            {
                name: 'description',
                message: 'Please enter project description: '
            },
            {
                name: 'author',
                message: 'Please enter author: '
            }
            // ,
            // {
            //     type: 'list',
            //     name: 'install',
            //     message: 'Auto do install',
            //     choices: [
            //         { name: 'yes', value: 'yes' },
            //         { name: 'no', value: 'no' }
            //     ]
            // }
        ]).then(async (answer) => {
            let loading = ora('downloading templates ...');
            loading.start();
            downloadLocal(projectName).then(() => {
                loading.succeed();
                const fileName = `${projectName}/package.json`;
                if(fs.existsSync(fileName)){
                    const data = fs.readFileSync(fileName).toString();
                    let json = JSON.parse(data);
                    json.name = projectName;
                    json.author = answer.author;
                    json.description = answer.description;
                    fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
                    // if(answer.install == 'yes') {
                    //     loading = ora('installing dependencies ...');
                    //     loading.start();
                    //     execFn(`cd ./${projectName} && npm install`);
                    //     loading.succeed();
                    // }
                    console.log(symbol.success, chalk.green('project initialization done!'));
                }
            }, () => {
                loading.fail();
            });
        });
    } else {
        console.log(symbol.error, chalk.red('floder ['+projectName+'] already existed'));
    }
}

module.exports = init;