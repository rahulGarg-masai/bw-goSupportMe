const path = require("path");


function fileInfofun(filepath){
    const fullpath = path.resolve(filepath);
    //resolve is the reliable way to turn any relative path into an absolute path before further processing.
    return {
        'file name': path.basename(fullpath) ,
        'file extension': path.extname(fullpath),
        'directory name': path.dirname(fullpath),
    }
}

//gotta export like this no more {} to wrap function name in exports
module.exports = fileInfofun;