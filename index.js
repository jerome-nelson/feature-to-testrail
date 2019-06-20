const glob = require('glob');
const fs = require('fs');
const converter = require('json2csv');
const { promisify } = require('util');

function conversion(data, convert = converter) {

}

// Read and combine data
function getFiles(name, fileSys = fs) {
    const { readFileSync } = fileSys;
    const storage = [];

    for(let i = 0; i < name.length; i+=1) {
       console.log(`${getFiles.prototype.name} - Parsing file: ${name[i]}`);
       const data = readFileSync(name[i], { encoding: "utf8", flag: "r" });
       if (!data) {
        console.log(`${getFiles.prototype.name} - No info found`);
        return;
       }
       storage.push(data);
    }
    return storage;
}

let testNames = glob("*.feature", {
    nonull: false,
    sync: true
});

try {
    getFiles(testNames);
} catch (e) {
    console.log(e);
}
// const output = async (names) => names ?  : 'no files';
// output(testNames);