const parser = require("../lib/parser");
let testNames = "__tests__/*.feature";

const defaultOptions = {
    dryrun: true
};

console.assert = function (condition, message, args) {
    const { check } = args;
    let isConditionTrue = false;

    (() => {
        const checks = Array.isArray(condition) ? condition : [condition]; 
        checks.forEach(elem => {
            isConditionTrue = elem === check
        });
    })()

    console.log(`${message}: ${isConditionTrue}`);
}

console.assert(parser("*.feature", defaultOptions),"It should log error if no file names found", { 
    check: "[Parser]::runInput - Error: No matching filenames found" 
})

console.assert([
    parser(2333, defaultOptions),
    parser(0XFFF, defaultOptions),
    parser({}, defaultOptions)
], "It should only allow strings", {
    check: "[Parser]::runInput - Error: Filename should be escaped"
})
