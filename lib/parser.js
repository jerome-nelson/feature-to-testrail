function parser (data, args) {
  const {debug} = args;
  const {log, devlog} = require ('./logger') ('[Parser]::', debug);

  const regLib = {
    tags: /((@[a-zA-Z]*)([_a-zA-Z]*)\s)/,
    featureTitle: /Feature:\s(.*)/,
    subTitle: /Scenario Outline:\s(.*)/,
    returnMatch: /\r?\n\t?\t?/,
  };

  const doesString = (str, match) =>
    str.trim ().toLowerCase ().startsWith (match);
  const getGroup = (matcher, input) => {
    let startIndex = -1;
    let output = [];

    input.forEach ((elem, index) => {
      if (!doesString (elem, matcher)) {
        return;
      }
      startIndex = index;
      output.push (elem);
      return;
    });
    const result = startIndex > -1 ? input.slice (startIndex + 1) : input;
    return []
      .concat (
        output,
        result.reduce ((accu, elem) => {
          if (!doesString (elem, 'and')) {
            return accu;
          }
          return [].concat (accu, doesString (elem, 'and') ? elem : []);
        }, [])
      )
      .join ('\r\n\t\t')
      .trim ();
  };

  const parseBody = input => {
    let inlineStr = input.split (regLib.returnMatch);
    let cleanStr = inlineStr[0] === '' ? inlineStr.slice (1) : inlineStr;
    return {
      steps: getGroup ('when', cleanStr),
      expected: getGroup ('then', cleanStr),
    };
  };

  const getPreconditions = input => {
    const preconditionStr = input.split (regLib.returnMatch);
    let parsed = preconditionStr[0] === ''
      ? preconditionStr.slice (1)
      : preconditionStr;
    return `${parsed[0]} ${parsed[1] && doesString (parsed[1], 'and') ? parsed[1] : ''}`;
  };
  const splitContent = input => {
    devlog (input.split (regLib.subTitle));
    return input.split (regLib.subTitle).slice (1);
  };
  const getTitle = input => {
    const result = input.match (regLib.featureTitle);
    if (!result) {
      devlog ('getTitle - ERROR: Result not defined');
      return void 0;
    }
    return result;
  };
  const getDescription = input => {
    const title = getTitle (input);

    if (!title) {
      devlog ('getTitle - ERROR: Result not defined');
      return void 0;
    }
    const strip = input.slice (title.index + title[0].length);
    const splitEnd = strip.match (regLib.tags);
    const end = strip
      .slice (0, splitEnd.index)
      .toLowerCase ()
      .replace (/\s+/g, ' ');
    return end.charAt (0).toUpperCase () + end.slice (1);
  };

  function formatData (input) {
    devlog ('[getTitle - Retrieving main title');
    const prefixTitle = getTitle (input)
      ? getTitle (input)[1].trim ()
      : getTitle (input);
    devlog ('splitContent - Parsing feature file for content');
    const sections = splitContent (input);
    devlog ('getDescription - Parsing feature file for main description');
    const description = getDescription (input)
      ? getDescription (input).trim ()
      : getDescription (input);
    const output = [];
    devlog ('formatData - Formatting data into csv-ready format');

    for (let i = 1; i <= sections.length; i += 2) {
      // Singletons
      const dateStamp = new Date ();
      const createdOn = `${dateStamp.getDay ()}/${dateStamp.getMonth ()}/${dateStamp.getFullYear ()} ${dateStamp.getHours ()}:${dateStamp.getMinutes ()}`;
      const Title = `${prefixTitle}: ${sections[i - 1]}`;
      const bodyText = sections[i].split (regLib.tags)[0];
      const {steps: Steps, expected: Expected} = parseBody (bodyText);

      output.push ({
        Steps,
        Expected,
        Title,
        Section: prefixTitle,
        Automated: 'Yes',
        Precondition: getPreconditions (bodyText),
        Suite: 'Feature Test Cases 2',
        Type: 'Other',
        Template: 'Generated Testing',
        'Section Description': description,
        'Created On': createdOn,
      });
    }
    return output;
  }

  return formatData (data);
}

module.exports = parser;
