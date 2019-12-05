// DAY 4

const _ = require("lodash")

const [min, max] = [136818, 685979]

let idx = min
let valid1Count = 0
let valid2Count = 0

const isValid1 = num => {
  const serial = `${num}`.split("")
  const ascNum = serial.sort().join("")
  const neverDecreases = `${num}` === ascNum
  const hasDouble = new Set(serial).size < 6

  return neverDecreases && hasDouble
}

const isValid2 = num => {
  if(isValid1(num)){
    const serial = `${num}`.split("")
    const group = _.groupBy(serial, Math.floor)
    const hasDouble = Object.keys(group).map(i => {
      return group[i].length === 2
    }).includes(true)
    if(hasDouble) return true
  }
  return false
}

while(idx <= max) {
  if(isValid1(idx)) valid1Count++
  if(isValid2(idx)) valid2Count++
  idx++
}


console.log(`Result 1: ${valid1Count}`)
console.log(`Result 2: ${valid2Count}`)
