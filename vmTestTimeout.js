// const {NodeVM} = require('vm2');

//   const vm = new NodeVM({
//     require: {
//         external: true,
//         builtin: ["*"]
//     },
//     wrapper: false,
//     sandbox: {
//     }
// });
// const result = vm.run("\n  let testdata= {\n      name: 'test'\n  }\n\n  module.exports = JSON.parse(JSON.stringify(testdata));");
// console.log(result);

const outputBe = require('./test1');
console.log(outputBe);
