var userInput = process.argv.slice(2);

var shows = require('./show')
shows.getData( userInput );
