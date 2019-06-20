const string = `'@fe @obg_desktop @account_settings @change_password\r\nFeature: Change Password\r\n\tIn order go to Change Password settings\r\n\tAs a user\r\n\tI want to ensure that the Change Password functionality works \r\n\t\r\n@smoke @Test @QA @Prod @Alpha\r\n\tScenario Outline: Change Password successfully\r\n\t\tGiven a setup for \'<application>\'.\'com\' on \'Desktop\'\r\n\t\tAnd I am in Home page\r\n\t\tWhen I log in with user \'qatestautochangepass@testsson.one\' and password \'Tester123\' for change password\r\n\t\tAnd I log out\r\n\t\tAnd I log in with user \'qatestautochangepass@testsson.one\' and new password\r\n\t\tThen the user should be logged in successfully\r\n\r\n\t\tExamples:\r\n\t\t| application |\r\n\t\t| nordicbet   |\r\n\t\t| betsson     |\r\n\t\t| betsafe     |\r\n\r\n@smoke @Test @QA @Prod @Alpha\r\n\tScenario Outline: Mismatched input fields between new password and confirm password fields\r\n\t\tGiven a setup for \'<application>\'.\'com\' on \'Desktop\'\r\n\t\tAnd I am in Home page\r\n\t\tWhen I log in with user \'qatestautochangepasserror@testsson.one\' and password \'Tester123\'\r\n        And I load lobby \'account-settings/change-password\' through URL\r\n\t\tAnd I fill in mismatched password details\r\n\t\tThen error message \'New and confirm passwords do not match.\' should be displayed\r\n\r\n\t\tExamples:\r\n\t\t| application |\r\n\t\t| nordicbet   |\r\n\t\t| betsson     |\r\n\t\t| betsafe     |\r\n'`;

const regLib = {
  tags: /((@[a-zA-Z]*)([_a-zA-Z]*)\s)/,
  featureTitle: /Feature:\s(.*)\r\n\t/,
  subTitle: /Scenario Outline:\s(.*)\r\n\t/,
};

// This is used to get the sub headings and content
// The first entry is the feature title, which 
// we don't need
const splitContent = (input) => {
    console.log("[Parser]::splitContent - Parsing feature file for content");
    return input.split(regLib.subTitle).slice(1);
}


const getTitle = input => {
    console.log("[Parser]::getTitle - Retrieving main title");    
    return input.match (regLib.featureTitle);
}
const getDescription = input => {
    console.log("[Parser]::getDescription - Parsing feature file for main description   ");
  const title = getTitle (input);
  const strip = input.slice (title.index + title[0].length);
  const splitEnd = strip.match (regLib.tags);
  const end = strip
    .slice (0, splitEnd.index)
    .toLowerCase ()
    .replace (/\s+/g, ' ');
  return end.charAt (0).toUpperCase () + end.slice (1);
};

function formatData (input) {

  const prefixTitle = getTitle (input)[1].trim ();
  const sections = splitContent(input);
  const description = getDescription (input).trim ();
  const output = [];

  console.log("[Parser]::formatData - Formatting data into csv-ready format");

  for (let i = 1; i <= sections.length; i += 2) {

    // Singletons
    const dateStamp = new Date ();
    const createdOn = `${dateStamp.getDay ()}/${dateStamp.getMonth ()}/${dateStamp.getFullYear ()} ${dateStamp.getHours ()}:${dateStamp.getMinutes ()}`;
    const title = `${prefixTitle}: ${sections[i-1]}`;
    
    output.push ({
      description,
      createdOn,
      steps: sections[i].split(regLib.tags)[0],
      title,
      section: prefixTitle,
      automated: 'Yes',
      expected: '',
      suite: 'Feature Test Cases 2',
      type: 'Other',
      template: 'Generated Testing',
    });

  }

  return output;
}
console.log(formatData (string));
