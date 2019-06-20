
const regLib = {
  tags: /((@[a-zA-Z]*)([_a-zA-Z]*)\s)/,
  featureTitle: /Feature:\s(.*)/,
  subTitle: /Scenario Outline:\s(.*)/,
};

const splitContent = (input) => {
  // console.log(input.split(regLib.subTitle));
  return input.split(regLib.subTitle).slice(1);
}


const getTitle = input => {
    const result = input.match (regLib.featureTitle);
    if (!result) {
      console.log("[Parser]::getTitle - ERROR: Result not defined");
      return void 0;
    }
    return result;
}
const getDescription = input => {
  const title = getTitle (input);

  if (!title) {
    console.log("[Parser]::getTitle - ERROR: Result not defined");
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
  console.log("[Parser]::getTitle - Retrieving main title");    
  const prefixTitle =  getTitle (input) ? getTitle (input)[1].trim () : getTitle(input);
  console.log("[Parser]::splitContent - Parsing feature file for content");
  const sections = splitContent(input);
  console.log("[Parser]::getDescription - Parsing feature file for main description   ");
  const description = getDescription (input) ? getDescription (input).trim () : getDescription (input);
  const output = [];
  console.log("[Parser]::formatData - Formatting data into csv-ready format");

  for (let i = 1; i <= sections.length; i += 2) {

    // Singletons
    const dateStamp = new Date ();
    const createdOn = `${dateStamp.getDay ()}/${dateStamp.getMonth ()}/${dateStamp.getFullYear ()} ${dateStamp.getHours ()}:${dateStamp.getMinutes ()}`;
    const Title = `${prefixTitle}: ${sections[i-1]}`;
    


    output.push ({
      "Section Description": description,
      "Created On": createdOn,
      Steps: sections[i].split(regLib.tags)[0],
      Title,
      Section: prefixTitle,
      Automated: 'Yes',
      Expected: '',
      Suite: 'Feature Test Cases 2',
      Type: 'Other',
      Template: 'Generated Testing',
    });

  }

  return output;
}

module.exports = formatData;