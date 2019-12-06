// Day 5

const data = require('fs').readFileSync('./data').toString()

const compute = (part2 = false) => {
  let stack = data.split(',').map(i => parseInt(i))
  let idx = 0
  let done = false
  while (!done) {
    let modes = Math.floor(stack[idx] / 100).toString()
    let [tgtMode, src2Mode, src1Mode] = [0, 0, 0]
    if (modes > 0) {
      if (modes.length < 3) {
        modes = modes.padStart(3, '0')
      }
      src1Mode = modes[2]
      src2Mode = modes[1]
      tgtMode = modes[0]
    }
    const opcode = stack[idx] % 100
    const offset1 = stack[idx+1]
    const offset2 = stack[idx+2]
    const tgt = stack[idx+3]
    if (opcode == 1) {
      const src1 = src1Mode == 1 ? offset1 : stack[offset1]
      const src2 = src2Mode == 1 ? offset2 : stack[offset2]
      stack[tgt] = src1 + src2
      idx += 4
    } else if (opcode == 2) {
      const src1 = src1Mode == 1 ? offset1 : stack[offset1]
      const src2 = src2Mode == 1 ? offset2 : stack[offset2]
      stack[tgt] = src1 * src2
      idx += 4
    } else if (opcode == 3) {
      stack[offset1] = part2 ? 5 : 1
      idx += 2
    } else if (opcode == 4) {
      const src1 = src1Mode == 1 ? offset1 : stack[offset1]
      console.log( src1 === 0 ? `Status Code: ${src1}` : `Result${part2 ? "2" : "1"}: ${src1}`)
      idx += 2
    } else if (opcode == 5) {
      const src1 = src1Mode == 1 ? offset1 : stack[offset1]
      const src2 = src2Mode == 1 ? offset2 : stack[offset2]
      if (src1 != 0) {
        idx = src2
      } else {
        idx += 3
      }
    } else if (opcode == 6) {
      const src1 = src1Mode == 1 ? offset1 : stack[offset1]
      const src2 = src2Mode == 1 ? offset2 : stack[offset2]
      if (src1 == 0) {
        idx = src2
      } else {
        idx += 3
      }
    } else if (opcode == 7) {
        const src1 = src1Mode == 1 ? offset1 : stack[offset1]
        const src2 = src2Mode == 1 ? offset2 : stack[offset2]
        stack[tgt] = src1 < src2 ? 1 : 0
        idx += 4
    } else if (opcode == 8) {
        const src1 = src1Mode == 1 ? offset1 : stack[offset1]
        const src2 = src2Mode == 1 ? offset2 : stack[offset2]
        stack[tgt] = src1 == src2 ? 1 : 0
        idx += 4
    } else if (opcode == 99) {
      done = true
    } else {
      console.log(`Bad opcode: ${opcode} ${idx}`)
      done = true
    }
  }
}

compute()
compute(true)
