// refs: https://www.unicode.org/versions/Unicode13.0.0/UnicodeStandard-13.0.pdf
// https://stackoverflow.com/questions/6240055/manually-converting-unicode-codepoints-into-utf-8-and-utf-16

function toBinString(num) {
  return num.toString(2);
}

// character 举
const numberToConvert = 0x4E3E;
// "100 111000 111110"
console.log(toBinString(numberToConvert));

// utf8 bit sequence to 0x4E3E
// 4 + 6 + 6
//1110 xxxx 10 xxxxxx 10 xxxxxx
//1110 0100 10 111000 10 111110

// 11100000
const offset = 0xE0;

const firstPart = offset + ((numberToConvert >> 12) & 0x3F);
const middlePart = 0x80 | ((numberToConvert >> 6) & 0x3F);
const lastPart = 0x80 | (numberToConvert & 0x3F)

console.log(firstPart);
console.log(middlePart);
console.log(lastPart);

let count = 2;
const bytes = [offset + ((numberToConvert >> 6 * count) & 0x3F)];

for (var i = count; i > 0; i--) {
  const sixBytesSection = (numberToConvert >> (6 * (i - 1))) & 0x3F;
  // push 10 xxxxxx | sixBytesSection
  bytes.push(0x80 | sixBytesSection);
}

console.log(bytes);
