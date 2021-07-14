import { getAll } from './rc';
import downloadGit from 'download-git-repo';

//下载模板
export const downloadLocal = async (templateName, projectName) => {
    let config = await getAll();
    let api = `github:${config.registry}/${templateName}`;
    return new Promise((resolve, reject) => {
        downloadGit(api, templateName, (err) => {
            if (err) {
                console.log('downloadGit', err);
                reject(err);
            }
            resolve();
        });
    });
}