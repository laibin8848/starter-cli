import { getAll } from './rc';
import downloadGit from 'download-git-repo';

//下载模板
export const downloadLocal = async (projectName) => {
    let config = await getAll();
    let api = `github:${config.user}/${config.registry}`;
    return new Promise((resolve, reject) => {
        downloadGit(api, projectName, (err) => {
            if (err) {
                console.log('downloadGit', err);
                reject(err);
            }
            resolve();
        });
    });
}