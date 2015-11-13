var shows = require('./show')

function handleInput(input) {
  if(input.length > 1) return input.join("-"); }

var userInput = handleInput(process.argv.slice(2));

shows.getData( userInput );




