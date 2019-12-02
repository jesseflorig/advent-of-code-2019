// DAY 2
const fs = require("fs");

fs.readFile("data", "utf8", (err, data) => {
  console.log(`Result 1: ${compute(data, 12,2)}`);
  console.log(`Result 2: ${findTarget(data, 19690720)}`)
});

// Find noun and verb for target
const findTarget = (data, target) => {
  let idx = 0
  let noun = 0
  let verb = 0
  let result = null
  while(result !== target){
    noun = Math.floor(idx/100)
    verb = idx % 99
    result = compute(data, noun, verb)
    idx += 1
  }
  return 100 * noun + verb
}

// Compute stack
const compute = (data, noun, verb) => {
  const stack = data.split(",").map(item => parseInt(item))
  let idx = 0;
  let opcode = stack[idx]
  stack[1] = noun;
  stack[2] = verb;
  while (opcode !== 99) {
    const src1 = stack[idx+1]
    const src2 = stack[idx+2]
    const tgt = stack[idx+3]
    switch(opcode) {
      case 1: 
        stack[tgt] = stack[src1] + stack[src2];
        break;
      case 2: 
        stack[tgt] = stack[src1] * stack[src2];
        break;
    }
    idx += 4;
    opcode = stack[idx]
  }
  return stack[0]
}
