// Extracted from https://github.com/inexorabletash/text-encoding/blob/master/lib/encoding.js

/**
   * @param {string} string Input string of UTF-16 code units.
   * @return {!Array.<number>} Code points.
   */
 function stringToCodePoints(string) {
  // https://heycam.github.io/webidl/#dfn-obtain-unicode

  // 1. Let S be the DOMString value.
  var s = String(string);

  // 2. Let n be the length of S.
  var n = s.length;

  // 3. Initialize i to 0.
  var i = 0;

  // 4. Initialize U to be an empty sequence of Unicode characters.
  var u = [];

  // 5. While i < n:
  while (i < n) {

    // 1. Let c be the code unit in S at index i.
    var c = s.charCodeAt(i);
    console.log(c) // 55348
    
    // 2. Depending on the value of c:
    
    // c < 0xD800 or c > 0xDFFF
    if (c < 0xD800 || c > 0xDFFF) {
      // Append to U the Unicode character with code point c.
      u.push(c);
    }

    // 0xDC00 ≤ c ≤ 0xDFFF
    else if (0xDC00 <= c && c <= 0xDFFF) {
      // Append to U a U+FFFD REPLACEMENT CHARACTER.
      u.push(0xFFFD);
    }

    // 0xD800 ≤ c ≤ 0xDBFF
    else if (0xD800 <= c && c <= 0xDBFF) {
      // 1. If i = n−1, then append to U a U+FFFD REPLACEMENT
      // CHARACTER.
      console.log(0xD800 <= c, c<= 0xDBFF)

      if (i === n - 1) {
        u.push(0xFFFD);
      }
      // 2. Otherwise, i < n−1:
      else {
        // 1. Let d be the code unit in S at index i+1.
        var d = s.charCodeAt(i + 1);

        // 2. If 0xDC00 ≤ d ≤ 0xDFFF, then:
        if (0xDC00 <= d && d <= 0xDFFF) {
          // 1. Let a be c & 0x3FF.
          var a = c & 0x3FF;

          // 2. Let b be d & 0x3FF.
          var b = d & 0x3FF;

          // 3. Append to U the Unicode character with code point
          // 2^16+2^10*a+b.
          u.push(0x10000 + (a << 10) + b);

          // 4. Set i to i+1.
          i += 1;
        }

        // 3. Otherwise, d < 0xDC00 or d > 0xDFFF. Append to U a
        // U+FFFD REPLACEMENT CHARACTER.
        else  {
          u.push(0xFFFD);
        }
      }
    }

    // 3. Set i to i+1.
    i += 1;
  }

  // 6. Return U.
  return u;
}

console.log(stringToCodePoints('𝌆'));

function inRange(a, min, max) {
return min <= a && a <= max;
}

function utf8E(code_point_str, stream = []) {
    // 1. If code point is end-of-stream, return finished.
    
    var code_point = stringToCodePoints(code_point_str);
    if (code_point === -1)
      return finished;

    // 2. If code point is an ASCII code point, return a byte whose
    // value is code point.
/*       if (isASCIICodePoint(code_point))
      return code_point; */

    // 3. Set count and offset based on the range code point is in:
    var count, offset;
    // U+0080 to U+07FF, inclusive:
    if (inRange(code_point, 0x0080, 0x07FF)) {
      // 1 and 0xC0
      count = 1;
      offset = 0xC0;
    }

    // input 55296
    // U+0800 to U+FFFF, inclusive:
    else if (inRange(code_point, 0x0800, 0xFFFF)) {
      // 2 and 0xE0
      count = 2;
      offset = 0xE0;
    }

    // U+10000 to U+10FFFF, inclusive:
    else if (inRange(code_point, 0x10000, 0x10FFFF)) {
      // 3 and 0xF0
      count = 3;
      offset = 0xF0;
    }

    // 4. Let bytes be a byte sequence whose first byte is (code
    // point >> (6 × count)) + offset.
    var bytes = [(code_point >> (6 * count)) + offset];
    console.log((6 * count))

    // 5. Run these substeps while count is greater than 0:
    while (count > 0) {

      // 1. Set temp to code point >> (6 × (count − 1)).
      var temp = code_point >> (6 * (count - 1));

      // 2. Append to bytes 0x80 | (temp & 0x3F).
      bytes.push(0x80 | (temp & 0x3F));

      // 3. Decrease count by one.
      count -= 1;
    }

    // 6. Return bytes bytes, in order.
    return bytes.map((b) => b.toString(2));
  }

/* console.log(utf8E('ç', [])) */
