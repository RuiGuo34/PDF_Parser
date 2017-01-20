function getIndicesOf(str, keywords) {
	var searchlength = keywords.length;
	if (searchlength == 0) return [];
	var startIndex = 0, index, indices = [];
	while ((index = str.indexOf(keywords, startIndex)) > -1) {
		indices.push(index);
		startIndex = index + searchlength;
	}
	return indices;
}

var fs = require('fs');
var filecontent = fs.readFileSync('/Users/Legolas/Documents/Twine Analytics/data_extraction/OpenPaymentsDataDictionary.html').toString();
var searched_page = '15';
var start = '<a name="'+searched_page+'">Page '+searched_page+'</a></div>';
var index_start = filecontent.indexOf(start);
var parsedcontent = filecontent.substring(index_start);
var end = '<div style="position:absolute; top:';
var index_end = parsedcontent.indexOf(end);
var pageContent = filecontent.substr(index_start, index_end);

// var striptags = require ('striptags');

// console.log(striptags(pageContent));

// console.log(pageContent);

var indexes = [], i = -1;

while ((i = pageContent.indexOf('position:absolute; border: black 1px solid;', i+1)) != -1) {
	indexes.push(i);
}

// console.log(indexes);
// console.log(pageContent.length);

// var position = [];
// var len = 'position:absolute; border: black 1px solid;'.length;

var block = [];

for (var i = 0; i < indexes.length; i++) {
	if (i != indexes.length - 1) {
		var span = indexes[i+1] - indexes[i];
//		console.log(pageContent.substr(indexes[i], span));
		block.push(pageContent.substr(indexes[i], span));
	}
	else {
		var temp = pageContent.substr(indexes[i], pageContent.length - indexes[i]);
		var end = temp.indexOf('>');
		block.push(temp.substr(0, end));
		// console.log(temp.substr(0, end));
	}
}
// console.log(block);
// var a = '20px';
// a = parseInt(a, 10);
// console.log(a);
// parse the coordinate position by semi colon
var coordinate = [];
for (var i = 0; i < block.length; i++) {
	var curr_line = block[i];
	var res = curr_line.split(";");
	var coordinate_split_left = res[2].split(":");
	var coordinate_split_top = res[3].split(":");
	var coordinate_split_width = res[4].split(":");
	var coordinate_split_height = res[5].split(":");
	
	var left = coordinate_split_left[1];
	var top = coordinate_split_top[1];
	var width = coordinate_split_width[1];
	var height = coordinate_split_height[1];

	left = parseInt(left);
	top = parseInt(top);
	width = parseInt(width);
	height = parseInt(height);

	var single_coordinate = [left, top, width, height];
	coordinate.push(single_coordinate);
}

// console.log(coordinate);
//extract the row intersect pixel position from coordinate array
var row_test = coordinate[0][1]; //i.e. in this example, 13255, there may be some cases that row_test varies in 1...
// console.log(row_test);
var col = [];
for (var i = 0; i < coordinate.length; i++) {
	if ((coordinate[i][1] <= row_test+1 && coordinate[i][1] >= row_test)  && coordinate[i][3] != 0) {
		if (col.indexOf(coordinate[i][0]) == -1) {
			col.push(coordinate[i][0]);
		}
	}
}

var col_test = col[0];
var row = [];
for (var i = 0; i < coordinate.length; i++) {
	if ((coordinate[i][0] >= col_test && coordinate[i][0] <= col_test + 1) && coordinate[i][2] != 0) {
		if (row.indexOf(coordinate[i][1] == -1)) {
			row.push(coordinate[i][1]);
		}
	}
}

// console.log(row, col);
var row_length = row.length;
var col_length = col.length;

cell_pos = []; //cell_pos position
for (var i = 0; i < row_length-1; i++) {
	var temp_row = [];
	for (var j = 0; j < col_length-1; j++) {
		var upper_left = [col[j], row[i]];
		var lower_right = [col[j+1], row[i+1]];
		// console.log(upper_left,lower_right);
		temp_row.push([upper_left,lower_right]);
	}
	// console.log(temp_row);
	cell_pos.push(temp_row);
}

// console.log(cell_pos);

var text_indexes = [], i = -1;

while ((i = pageContent.indexOf('position:absolute; border: textbox 1px solid;', i+1)) != -1) {
	text_indexes.push(i);
}

// console.log(text_indexes);

var text_block = [];

for (var i = 0; i < text_indexes.length; i++) {
	if (i != text_indexes.length - 1) {
		var span = text_indexes[i+1] - text_indexes[i];
		// console.log(pageContent.substr(indexes[i], span));
		text_block.push(pageContent.substr(text_indexes[i], span));
	}
	else {
		var temp = pageContent.substr(text_indexes[i], pageContent.length - text_indexes[i]);
		var end = temp.indexOf('<br>');
		text_block.push(temp.substr(0, end));
		// console.log(temp.substr(0, end));
	}
}

// var res = text_block[text_block.length-1].split(";");

// console.log(text_block);

text_info = [];

for (var i = 0; i < text_block.length; i++) {
	//getting the coordinate information

	var res = text_block[i].split(";");
	var coordinate_split_left = res[3].split(":");
	var coordinate_split_top = res[4].split(":");
	var coordinate_split_width = res[5].split(":");
	var coordinate_split_height = res[6].split(":");

	var left = coordinate_split_left[1];
	var top = coordinate_split_top[1];
	var width = coordinate_split_width[1];
	var height = coordinate_split_height[1];

	left = parseInt(left);
	top = parseInt(top);
	width = parseInt(width);
	height = parseInt(height);

	var single_coordinate = [left, top, width, height];

	//getting the text field
	var sample = text_block[i];
	// console.log(i, sample); i=6
	var mark = 'font-size';
	var res = ''; 
	var index_start = sample.indexOf(mark);

	var sub_sample = sample.substr(index_start);
	
	//this piece of code has some errors
	//possible solution: rewrite a function that searches for all the indexes in the text containing 
	//font-size: 14 px as well as the parsing of newline (\n)
	// if (i == 6) {
		indices = getIndicesOf(sub_sample,'font-size:14px">');
		var result = "";
		for (var l = 0; l < indices.length; l++) {
			var index_start = indices[l];
			var curr_sample = sub_sample.substr(index_start+16);
			var index_start = curr_sample.indexOf('</span>');
			if (index_start != -1) {
				curr_sample = curr_sample.substring(0, index_start);
			}
			curr_sample = curr_sample.split("<br>").join("");
			curr_sample = curr_sample.split("\n").join("");
			// console.log(curr_sample);
			result += curr_sample;
		}

	// }


	// var index_start = sub_sample.indexOf('font-size:14px">');
	// var sub_sample = sub_sample.substr(index_start+16);
	// var index_start = sub_sample.indexOf('</span>');

	// if (index_start != -1) {
	// 	sub_sample = sub_sample.substring(0, index_start);
	// }

	// //one way to replace all the <br> 
	// sub_sample = sub_sample.split("<br>").join("");
	// sub_sample = sub_sample.split("\n").join("");

	text_info.push([single_coordinate, result]);
}


//locate the text content inside each cell
var table_data = [];
for (var i = 0; i < row_length - 1; i++) {
	var cell_data = [];
	for (var j = 0; j < col_length - 1; j++) {
		var table_data_row = [];
		var cell_info = cell_pos[i][j];
		var curr_cell_upper_left_x = cell_info[0][0];
		var curr_cell_upper_left_y = cell_info[0][1];
		var curr_cell_lower_right_x = cell_info[1][0];
		var curr_cell_lower_right_y = cell_info[1][1];
		
		var append = "";

		for (var k = 0; k < text_info.length; k++) {
			var textbox = text_info[k];
			var text_x = textbox[0][0];
			var text_y = textbox[0][1];
			
			if (text_x >= curr_cell_upper_left_x && text_x <= curr_cell_lower_right_x && text_y >= curr_cell_upper_left_y && text_y <= curr_cell_lower_right_y) {
				append += textbox[1];
				//cell_data.push(textbox[1]);
			}
		}
		cell_data.push(append);
	}
	table_data.push(cell_data);
}
console.log(table_data);
