import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols';
import { deleteFolder, fetchFloders } from './utils/file';
import path from 'path';

let page = async (action, moduleName) => {
    console.log(action, moduleName)
    if (!fs.existsSync('./src/module')) {
        console.log(symbol.success, chalk.red('dynamic module not support this project!'));
        return;
    }
    const modulePath = `./src/module/${moduleName}`;
    switch (action) {
        case 'add':
            if(fs.existsSync(modulePath)) {
                console.log(symbol.success, chalk.red(`module ${moduleName} already exists!`));
                return;
            }
            
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'tpl',
                    message: 'please select a template to create',
                    choices: [
                        { name: 'default, empty template', value: 'default' },
                        { name: 'chart, chart demo template', value: 'chart' },
                        { name: 'table, table demo template', value: 'table' },
                        { name: 'form, form demo template', value: 'form' }
                    ]
                }
            ]).then(async (answer) => {
                const zipPath = path.resolve(__dirname+`/../src/templates/module/${answer.tpl}.zip`);
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
            });
            break;
        case 'rm':
            if(!fs.existsSync(modulePath)) {
                console.log(symbol.success, chalk.red(`module ${moduleName} not exists!`));
                return;
            }
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'confirm',
                    message: 'Are you sure to delect this module?'
                }
            ]).then(async (answer) => {
                if(!answer.confirm) {
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

module.exports = page;