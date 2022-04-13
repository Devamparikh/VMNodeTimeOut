const {NodeVM} = require('vm2');
const cp = require('child_process');
var __filename = 'test1';
// this function can safely be used from the main process. sandbox is limited to JSON values
function run(code='', sandbox={}, timeout=1000){
  return new Promise((resolve, reject)=>{
    const sub = cp.fork(__filename); // fork same file as child process. see code at the end
    const kto = setTimeout(()=>{sub.kill(9)}, timeout);
    sub.on('message', (m)=>{
      if(m.type == 'finished'){
        clearTimeout(kto);
        resolve({returnValue: m.returnValue, sandbox: m.sandbox});
      }
    });
    sub.on('exit', function(c,s) {
      if(c !== 0) reject(new Error(`Execution halted! ${s}`));
    });
    sub.send({code, sandbox});
  })
}

// this function is only used from the spawned child process
async function runVM(code='', sandbox={}){
//   code = `module.exports = async function(){ ${code} }`;
//   sandbox = Object.assign({wait: (n)=>new Promise(r=>setTimeout(r, n))}, sandbox); // you can still push functions to the sandbox if they're defined in the child process!
  const vm = new NodeVM({
    require: {
        external: true,
        builtin: ["*"]
    },
    wrapper: false,
    sandbox: {
    }
});
  const resultfn = vm.run(code);
//   const returnValue = await resultfn();
  return {sandbox, resultfn};
}

module.exports = { run }

// ran as script and not imported. used as child process
if(typeof require !== 'undefined' && require.main === module){
  (async function(){
    process.on('message', async function(m) {
      if(m.code && m.sandbox){
        const result = await runVM(m.code, m.sandbox);
        // console.log(result.resultfn);
        process.send({type: 'finished', returnValue: result.returnValue, sandbox: result.sandbox});
        process.exit();
      }
    });
  })();
}