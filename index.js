const glob = require('glob');
const fs = require('fs');
const converter = require('json2csv');
const formatData = require('./converter');

// Seperate file
function conversion(data, convert = converter) {

}

// Read and combine data
function getFiles(name, fileSys = fs) {
    const { readFileSync } = fileSys;
    const storage = [];

    for(let i = 0; i < name.length; i+=1) {
       console.log(`[Parser]::getFiles - Getting data from ${name[i]}`);
       const data = readFileSync(name[i], { encoding: "utf8", flag: "r" });
       if (!data) {
        console.log(`[Parser]::getFiles - No info found`);
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

let parsedData = [];
try {
    const rawData = getFiles(testNames);
    for (let i = 0; i <= rawData.length -1; i+=1) {
        const result = formatData(rawData[i]);
        console.log(result);
        parsedData.push(result);
    }
} catch (e) {
    console.log(`[Parser]:Error Found -`, e);
}

console.log(parsedData);
