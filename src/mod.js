import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols';
import { deleteFolder, fetchFloders } from './utils/file';
import path from 'path';

let mod = async (action, moduleName) => {
    if (!fs.existsSync('./src/module')) {
        console.log(symbol.success, chalk.red('module floder not exists in the project!'));
        return;
    }
    const modulePath = `./src/module/${moduleName}`;
    switch (action) {
        case 'add':
            if(fs.existsSync(modulePath)) {
                console.log(symbol.success, chalk.red(`module ${moduleName} already exists!`));
                return;
            }
            const zipPath = path.resolve(__dirname+'/../src/templates/module/download.zip');
            const StreamZip = require('node-stream-zip');
            const zip = new StreamZip.async({ file: zipPath });
            await fs.mkdirSync(modulePath);
            await zip.extract(null, modulePath);
            const moduleInfo = path.resolve(modulePath + '/main_tpl.js');
            const moduleInfoTo = path.resolve(modulePath + '/main.js');
            const data = fs.readFileSync(moduleInfo).toString();
            fs.writeFileSync(moduleInfoTo, data.replace(/@moduleName@/g, moduleName), 'utf-8');

            //
            const floders = fetchFloders('./src/module');
            const indexfile = './src/module/index.json';
            if(fs.existsSync(indexfile)){
                const data = fs.readFileSync(indexfile).toString();
                let json = JSON.parse(data);
                json.moduleList = floders;
                fs.writeFileSync(indexfile, JSON.stringify(json, null, '\t'), 'utf-8');
            }
            break;
        case 'remove':
            if(!fs.existsSync(modulePath)) {
                console.log(symbol.success, chalk.red(`module ${moduleName} not exists!`));
                return;
            }
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'confirm',
                    message: 'Are you sure to delect this module?',
                    choices: [
                        { name: 'yes', value: 'yes' },
                        { name: 'no', value: 'no' }
                    ]
                }
            ]).then(async (answer) => {
                if(answer.confirm == 'no') {
                    return;
                }
                let loading = ora('module removing ...');
                loading.start();
                try {
                    deleteFolder(modulePath);
                    const floders = fetchFloders('./src/module');
                    
                    const indexfile = './src/module/index.json';
                    if(fs.existsSync(indexfile)){
                        const data = fs.readFileSync(indexfile).toString();
                        let json = JSON.parse(data);
                        json.moduleList = floders;
                        fs.writeFileSync(indexfile, JSON.stringify(json, null, '\t'), 'utf-8');
                    }
                } catch(err) {
                    console.log(symbol.success, chalk.red(err));
                    loading.fail();
                }
                loading.succeed();
                console.log(symbol.success, chalk.green('module removed done!'));
            });
            break;
        default:
            break;
    }
}

module.exports = mod;