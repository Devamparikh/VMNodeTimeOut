const {run} = require('./vmWithTimeOut');
// var code = 'let x = 1; while (x < 20) { console.log(x); x++; } return true';
var code = `module.exports = JSON.parse(JSON.stringify({'test': 'value'}));`;
var opt = run(code);
var optresult;
opt.then((value) => {
    console.log(value.returnValue);
    optresult = value.returnValue;
    return value.returnValue;
    // expected output: "Success!"
  });
  console.log("optresult:", optresult);
