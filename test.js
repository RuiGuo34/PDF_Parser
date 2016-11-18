var fs = require('fs');

var filecontent = fs.readFileSync('/Users/Legolas/Documents/Twine Analytics/data_extraction/Physician_Compare_2014_Data_Dictionaries.html').toString();

var searched_page = '1';

var start = '<a name="'+searched_page+'">Page '+searched_page+'</a></div>';

// var you = 'font-size:14px">'+'18'+'\n<br></span></div>'; //this is wrong because not all the page ends in page number
var index_start = filecontent.indexOf(start);

//parse the string from start to end
var parsedcontent = filecontent.substring(index_start);

var end = '<span style="position:absolute; border:';

var index_end = parsedcontent.indexOf(end);

var pageContent = filecontent.substr(index_start, index_end);

var striptags = require ('striptags');

console.log(striptags(pageContent));