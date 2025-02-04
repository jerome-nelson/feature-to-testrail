const glob = require ('glob');
const fs = require ('fs');
const {Parser} = require ('json2csv');

function converter (globString, args = {}) {
  const {debug, output, dryrun} = args;
  const {log, devlog} = require ('./logger') ('[Converter]::', debug);

  if (!output && !dryrun) {
    devlog (`Error - No output given`);
    return `Error - No output`;
  }

  const parser = require ('./parser');

  function getFileNames (globString) {
    return glob (globString, {
      nonull: false,
      sync: true,
    });
  }

  function saveFile (data, path) {
    buffer = Buffer.from (data);

    fs.open (path, 'w', function (err, fd) {
      if (err) {
        throw 'error opening file: ' + err;
      }

      fs.write (fd, buffer, 0, buffer.length, null, function (err) {
        if (err) throw 'error writing file: ' + err;
        fs.close (fd, function () {
          devlog ('saveFile:: file written to system');
        });
      });
    });
  }

  function getFiles (name, fileSys = fs) {
    const {readFileSync} = fileSys;
    const storage = [];

    for (let i = 0; i < name.length; i += 1) {
      devlog (`getFiles - Getting data from ${name[i]}`);
      const data = readFileSync (name[i], {encoding: 'utf8', flag: 'r'});
      if (!data) {
        devlog (`getFiles - No info found`);
        return `[Converter]::getFiles - No info found`;
      }
      storage.push (data);
    }
    return storage;
  }

  function runInput (globString) {
    if (!globString || typeof globString !== 'string') {
      devlog (`runInput - Error: Filename should be escaped`);
      return `[Converter]::runInput - Error: Filename should be escaped`;
    }

    let fileNames = getFileNames (globString);
    if (!fileNames || fileNames.length === 0) {
      devlog (`runInput - Error: No matching filenames found`);
      return `[Converter]::runInput - Error: No matching filenames found`;
    }

    let parsedData = [];
    try {
      const rawData = getFiles (fileNames);
      for (let i = 0; i <= rawData.length - 1; i += 1) {
        const result = parser (rawData[i], {debug});
        parsedData = [].concat (parsedData, result);
      }
    } catch (e) {
      devlog (`Error Found -`, e);
    }

    const opts = {fields: require ('./field-definitions.json')};

    try {
      const parser = new Parser (opts);
      const csv = parser.parse (parsedData);

      if (!dryrun) {
        saveFile (csv, output);
        return;
      }

      return csv;
    } catch (err) {
      console.error (err);
    }
  }
  return runInput (globString);
}
module.exports = converter;
