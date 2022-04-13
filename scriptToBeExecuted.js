const {run} = require('./vmWithTimeOut');
var code = 'let x = 1; while (x < 20) { console.log(x); x++; } ';
run(code);
