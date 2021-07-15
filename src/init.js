import { downloadLocal } from './utils/get';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols';
const execFn = require('child_process').execSync;

let init = async (projectName) => {
    //项目不存在
    if (!fs.existsSync(projectName)) {
        //命令行交互
        inquirer.prompt([
            {
                name: 'description',
                message: '请输入项目描述: '
            },
            {
                name: 'author',
                message: '请输入作者: '
            },
            {
                type: 'list',
                name: 'install',
                message: '是否自动安装依赖',
                choices: [
                    { name: '是', value: 'yes' },
                    { name: '否', value: 'no' }
                ]
            }
        ]).then(async (answer) => {
            //下载模板 选择模板
            //通过配置文件，获取模板信息
            let loading = ora('模板下载中 ...');
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
                    //修改项目文件夹中 package.json 文件
                    fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
                    if(answer.install == 'yes') {
                        loading = ora('安装依赖 ...');
                        loading.start();
                        execFn(`cd ./${projectName} && npm install`);
                        loading.succeed();
                    }
                    console.log(symbol.success, chalk.green('项目初始化完成!'));
                }
            }, () => {
                loading.fail();
            });
        });
    }else {
        //项目已经存在
        console.log(symbol.error, chalk.red('项目已经存在'));
    }
}

module.exports = init;