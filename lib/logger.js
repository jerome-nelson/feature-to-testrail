function logger (namespace = '', debugMode = false) {
  return {
    log: string => console.log (namespace + string),
    devlog: string =>
      debugMode ? console.log ('DEBUG ' + namespace + string) : '',
  };
}

module.exports = logger;
