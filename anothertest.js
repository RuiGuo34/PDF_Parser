var str = 'font-size:14px">Max\n<br></span><span style="font-family: EYQQLF+Calibri-Bold; font-size:14px">Length</span><span style="font-family: LGHGFR+Calibri; font-size:14px"> <br></span></div><div style="';
var regex = /font-size:14px">/gi, result, indices = [];
while ( (result = regex.exec(str)) ) {
    indices.push(result.index);
}
console.log(indices);
console.log(str.length);
console.log(str.substr(149,195-149));