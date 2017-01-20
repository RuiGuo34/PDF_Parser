var fs = require('fs');

var filecontent = fs.readFileSync('/Users/Legolas/Documents/Twine Analytics/data_extraction/Physician_Compare_2014_Data_Dictionaries.html').toString();

var searched_page = '2';

var start = '<a name="'+searched_page+'">Page '+searched_page+'</a></div>';

var index_start = filecontent.indexOf(start);

var parsedcontent = filecontent.substring(index_start);

var end = '<span style="position:absolute; border:';

var index_end = parsedcontent.indexOf(end);

var pageContent = filecontent.substr(index_start, index_end);

var striptags = require ('striptags');

console.log(striptags(pageContent));