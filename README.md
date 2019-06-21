Quick Node Tool to Convert *.feature files to .csv
===================================================

Specifically used to convert *.feature files from [https://bitbucketsson.betsson.local/projects/TEA/repos/testautomation/browse](TestAutomation).

Tested against CasinoCommon `*.feature` files.

## Installation
```bash
npm i -g <folder path> / i.e npm i -g C:\git\testrail-converter
```

## Usage :
There is only one command `convert` as seen below:

`gherkintocsv convert <glob pattern> [flags] -o <save file path>`

### Example
```bash
$ gherkintocsv convert "*.feature" -o "C:\Users\user\Desktop\testrail.csv" -D true
or
$ gherkintocsv *.feature -o testrail.csv -d true
```

### Command Flags
- `debug | -D`: Set to true to see console output when running command
- `dry | -d`: Can be used for testing

### TODO
* Examine PoC and replace with suitable structure to meet requirements
* Convert console.log to logging factory and exceptions
* Write mock test cases - for previous functions
* Prevent Invalid Commands
* Addition of conventional commits for commit linting