var cheerio = require('cheerio');
var Promise = require('promise');
var request = require('request');

init();

function init(){
    readArgs();
}

function readArgs(){
    var args = process.argv.slice(2);
    var count;
    if(args[0] == "-h"){
      console.log('usage: dancurr <int: ammount> <string: currency from> <string: currency to>');
    }else if(args[0] == 0){
      console.log('value entered is 0')
    }else{
      if(args.length > 3){
        console.log('too many arguments');
      }else if (args.length < 3) {
        console.log('too few arguments');
      }else{
        scrape(editurl(args));
      }
    }
}

function editurl(args){
  var url = "http://www.xe.com/currencyconverter/convert/?Amount=" + args[0] + "&From=" + args[1] + "&To=" + args[2];
  return url;
}

function scrape(url){
    return new Promise((resolve, reject) => {
        request(url, function (error, response, html) {
              var $ = cheerio.load(html);
              var value = $('.uccResultAmount').text();
              if(value == 0){
                console.log('Either currency not found')
              }else{
                console.log(value);
              }
        });
    });
}
