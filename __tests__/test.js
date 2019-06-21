const converter = require ('../lib/converter');
const defaultOptions = {
  dryrun: true,
  debug: false
};

console.assert = function (condition, message, args) {
  const {check, funcCheck} = args;
  let isConditionTrue = false;

  (() => {
    const checks = Array.isArray (condition) ? condition : [condition];
    checks.forEach (elem => {
      isConditionTrue = check
        ? elem === check
        : funcCheck ? funcCheck (elem) : false;
    });
  }) ();

  console.log (`${message}: ${isConditionTrue}`);
};

console.assert (
  converter ('*.feature', defaultOptions),
  'It should log error if no file names found',
  {
    check: '[Converter]::runInput - Error: No matching filenames found',
  }
);

console.assert (
  [
    converter (2333, defaultOptions),
    converter (0xfff, defaultOptions),
    converter ({}, defaultOptions),
  ],
  'It should only allow strings',
  {
    check: '[Converter]::runInput - Error: Filename should be escaped',
  }
);

// Parsing Tests
console.assert (
  [converter ('__tests__/mocks/test.feature', defaultOptions)],
  'It should print out `Given Block` in Precondition column',
  {
    funcCheck: result => {
      const haystack = result
        .split (',')
        .map (elem => elem.replace (/\"/g, '').replace (/\r?\n|\r|\t/g, ''));
      const getStepOrder = haystack.indexOf ('Precondition');
      return (
        haystack.indexOf (
          `Given a setup for '<application>'.'com' on 'Desktop' And I am in Home page`
        ) %
          getStepOrder ==
        0
      );
    },
  }
);

console.assert (
  [converter ('__tests__/mocks/test2.feature', defaultOptions)],
  'It should print out `Given Block` in Precondition column even if no `And`',
  {
    funcCheck: result => {
      // Not correct test - needs factorial loop
      const haystack = result
        .split (',')
        .map (elem => elem.replace (/\"/g, '').replace (/\r?\n|\r|\t/g, ''));
      const getStepOrder = haystack.indexOf ('Precondition');
      return (
        haystack.indexOf (
          `Given a setup for '<application>'.'com' on 'Desktop' `
        ) %
          getStepOrder ==
        0
      );
    },
  }
);

console.assert (
  [converter ('__tests__/mocks/test2.feature', defaultOptions)],
  'It should print out steps in correct column',
  {
    funcCheck: result => {
      const haystack = result
        .split (',')
        .map (elem => elem.replace (/\"/g, '').replace (/\r?\n|\r|\t/g, ''));
      const getStepOrder = haystack.indexOf (
        `When I log in with user \'qatestautochangepass@testsson.one\' and password \'Tester123\' for change passwordAnd I log outAnd I log in with user \'qatestautochangepass@testsson.one\' and new password`
      );
      return (
        haystack.indexOf (
          `When I log in with user \'qatestautochangepass@testsson.one\' and password \'Tester123\' for change passwordAnd I log outAnd I log in with user \'qatestautochangepass@testsson.one\' and new password`
        ) %
          getStepOrder ==
        0
      );
    },
  }
);
