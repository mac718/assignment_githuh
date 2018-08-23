const request = require('request');
const prompt = require('prompt');
const colors = require("colors/safe");

const baseUri = 'https://api.github.com';

class GitHuh {
  repos(user) {
    request(`${baseUri}/users/${user}/repos?sort=created`, { headers: { 'User-Agent': 'mac718'}}, 
      function (error, response, body) {
      let recentRepos = JSON.parse(body).map( repo => { return repo.name })
      if (!error && response.statusCode == 200) {
        console.log(recentRepos);
      }
    })
  }

  stars(user) {
    request(`${baseUri}/users/${user}/repos?sort=created`, { headers: { 'User-Agent': 'mac718'}}, 
      function (error, response, body) {
      let starredRepos = JSON.parse(body).filter( repo => { return repo.stargazers_count > 0 })
      if (!error && response.statusCode == 200) {
        console.log(starredRepos);
      }
    })
  }

  profile(user) {
    request(`${baseUri}/users/${user}`, { headers: { 'User-Agent': 'mac718'}}, 
      function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(JSON.parse(body));
      }
    })
  }
}

const gitHuh = new GitHuh;


 prompt.start();
 
  
   prompt.message = colors.yellow();
   prompt.delimiter = colors.yellow(":");
 
  prompt.start();
 
  prompt.get({
    properties: {
      command: {
        description: colors.yellow("Enter command")
      }
    }
  }, function (err, result) {
    
    let commandArr = result.command.split(' ');
    
    if (commandArr[1] == 'repos') {
      gitHuh.repos(commandArr[2]);
    } else if (commandArr[1] == 'starred') {
      gitHuh.starred(commandArr[2]);
    } else if (commandArr[1] == 'profile') {
      gitHuh.profile(commandArr[2]);
    };
  });
