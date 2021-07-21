import fs from 'fs';

export const deleteFolder = (path) => {
    let files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

export const fetchFloders = (path) => {
    let files = [];
    const floders = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index){
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) {
                floders.push(file);
            }
        });
    }
    return floders;
}