const glob = require('glob');
const fs = require('fs');
const { Parser } = require('json2csv');


function parser(globString, args = {}) {

    const { debug, output, dryrun } = args;
    const { log, devlog } = require('./logger')('[Parser]::', debug);

    if (!output && !dryrun) {
        devlog(`Error - No output given`)
        return `Error - No output`;
    }

    const formatData = require('./converter');

    function getFileNames(globString) {
        return glob(globString, {
            nonull: false,
            sync: true
        });
    }

    function saveFile(data, path) {
        buffer = new Buffer(data);

        fs.open(path, 'w', function(err, fd) {
            if (err) {
                throw 'error opening file: ' + err;
            }

            fs.write(fd, buffer, 0, buffer.length, null, function(err) {
                if (err) throw 'error writing file: ' + err;
                fs.close(fd, function() {
                    console.log('file written');
                })
            });
        });
    }

    function getFiles(name, fileSys = fs) {
        const { readFileSync } = fileSys;
        const storage = [];

        for(let i = 0; i < name.length; i+=1) {
            devlog(`getFiles - Getting data from ${name[i]}`);
        const data = readFileSync(name[i], { encoding: "utf8", flag: "r" });
        if (!data) {
            devlog(`[Parser]::getFiles - No info found`);
            return `[Parser]::getFiles - No info found`;
        }
        storage.push(data);
        }
        return storage;
    }


    function runInput(globString) {

        if (!globString || typeof globString !== 'string') {
            devlog(`[Parser]::runInput - Error: Filename should be escaped`);
            return `[Parser]::runInput - Error: Filename should be escaped`;
        }

        let fileNames = getFileNames(globString);
        if (!fileNames || fileNames.length === 0) {
            devlog(`[Parser]::runInput - Error: No matching filenames found`);
            return `[Parser]::runInput - Error: No matching filenames found`;
        }

        let parsedData = [];
        try {
            const rawData = getFiles(fileNames);
            for (let i = 0; i <= rawData.length -1; i+=1) {
                const result = formatData(rawData[i], { log, devlog });
                parsedData = [].concat(parsedData, result);
            }
        } catch (e) {
            devlog(`Error Found -`, e);
        }

        const opts = { fields:  require('./field-definitions.json')};
        
        try {
            const parser = new Parser(opts);
            const csv = parser.parse(parsedData);

            if (!dryrun) {
                saveFile(csv, output);
            } else {
                log(csv);
            }
        } catch (err) {
        console.error(err);
        }
    }
    return runInput(globString);
}
module.exports = parser;