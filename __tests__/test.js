const parser = require("../lib/parser");
let testNames = "__tests__/*.feature";

const defaultOptions = {
    dryrun: true,
};

console.assert = function (condition, message, args) {
    const { check, funcCheck } = args;
    let isConditionTrue = false;

    (() => {
        const checks = Array.isArray(condition) ? condition : [condition]; 
        checks.forEach(elem => {
            isConditionTrue = elem === check ? check : funcCheck ? funcCheck(elem) : false
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

// Parsing Tests
console.assert([parser("__tests__/test.feature", defaultOptions)],
    "It should print out `Given Block` in Precondition column",
    { 
        funcCheck: (result) => {
        const haystack = result.split(',').map((elem) => elem.replace(/\"/g, "").replace(/\r?\n|\r|\t/g, ''))
        const getStepOrder = haystack.indexOf('Precondition');
        return haystack.indexOf(`Given a setup for '<application>'.'com' on 'Desktop' And I am in Home page`) 
            % getStepOrder == 0
    }
})