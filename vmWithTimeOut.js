const {NodeVM} = require('vm2');
const vm = new NodeVM({ timeout: 1000, eval: false });
let functionInSandbox = vm.run('module.exports = function() { var _timer; _timer = Date.now(); let x = 1; while (true) { console.log(x); if (Date.now() > (_timer + 1000)) throw "Execution TIMEOUT"; x++; } }');
functionInSandbox();


//Below code is used in vm.run which terminates execution of vmNode.
// var _timer; 
// _timer = Date.now(); 
// let x = 1; 
// while (true) { 
//     console.log(x); 
//     if (Date.now() > (_timer + 1000)) throw "Execution TIMEOUT"; 
//     x++; 
// }