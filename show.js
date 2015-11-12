var http = require('http');
// connect to show API and get a show info
// parse out name, day, time, and summary 

//log show info to terminal window 
function logShowInfo(name, summary, day, time) {
  console.log("name: " + name + "\n" + 
              "summary: " + summary + "\n" + 
              "day: " + day + "\n" + 
              "time: " + time
              );
}

//log error messages 
function printError(error) {
  console.error(error.message);
}

//Read the data
function getData(inputName) {
  var url = 'http://api.tvmaze.com/singlesearch/shows?q=' + inputName;
  var req = http.get(url, function(res) {
      var body = "";
      res.on('data', function(chunk) {
        body += chunk; // chunks can be added to body as the come in (stream)
      });
      res.on('end', function() { 
        if (res.statusCode === 200) {
          try {
            //Parse the data
            var show = JSON.parse(body);
            //Print the data
            logShowInfo(show.name, show.summary, show.schedule.days[0], show.schedule.time);
          }
          catch (error) {
            // handles parsing error 
            printError(error);
          }
        }
        else {
          // handles status code error
          printError({ message: "There was an error getting the show for " + inputName + ". (" + http.STATUS_CODES[res.statusCode] + ")" })
        }
      });
    });

  // handles connection error 
  req.on('error', printError);
}

module.exports.getData = getData;