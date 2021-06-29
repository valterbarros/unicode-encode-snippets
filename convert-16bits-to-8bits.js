// ref https://stackoverflow.com/questions/29712951/how-to-convert-two-8-bits-to-16-bits-and-vice-versa-in-javascript
var firstNumber = 1118; // extracted from Uint16Array

/* console.log(firstNumber.toString(2)) */

var high = ((firstNumber >> 8) & 0xff);
var low = firstNumber & 0xff;

/* console.log(high.toString(2))
console.log(low.toString(2)) */

var _firstNumber = (((high & 0xff) << 8) | (low & 0xff));

/* console.log(_firstNumber); // 1118 */

var numberToEncode = 0x4E3E;

console.log(numberToEncode.toString(2));


var high2 = ((numberToEncode >> 4) & 0xff);
var low2 = numberToEncode & 0xff;

console.log(high2.toString(2));
console.log(low2.toString(2));
