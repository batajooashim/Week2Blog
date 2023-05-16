const fs = require('fs');
// post[0].id

const getNewId = (array) => {
    const arrayLength = array.length;

    if (arrayLength > 0) {
        return array[arrayLength - 1].id + 1;
    } 
    
    return 1;
}

const getDate = () => new Date().toString();

const mustBeInArray = (array, id) => {
    return new Promise((resolve, reject) => {

        const row = array.find(r => r.id == id);
        if (!row) {
            reject({
                message: 'ID not found',
                status: 404
            });
        }
        resolve(row);
    });
}

const writeJSONFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', err => {
        if (err) {
            console.error(err);            
        }
    });
}

module.exports = {
    getNewId,
    getDate,
    mustBeInArray,
    writeJSONFile
}
