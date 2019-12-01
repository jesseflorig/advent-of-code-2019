// DAY 1
const fs = require("fs");

let result1 = 0
let result2 = 0

fs.readFile("data", "utf8", (err, data) => {
  data.trim().split("\n").map(input => {
    const fuelReq1 = calcFuel(input, 0)
    const fuelReq2 = calcRecursiveFuel(input, 0)
    console.log(`Fuel req for ${input} is ${fuelReq1}`)
    console.log(`Recursive fuel req for ${input} is ${fuelReq2}`)
    result1 += fuelReq1
    result2 += fuelReq2
  })
  console.log(`Result 1: ${result1}`)
  console.log(`Result 2: ${result2}`)
});


// Calculate fuel recursively until input is less than 0
const calcRecursiveFuel = (input, total) => {
  const current = calcFuel(input)
  const newTotal = total + current
  console.log(current, newTotal)
  return current > 0 ? calcRecursiveFuel(current, newTotal) : total
}

// Divide by 3, round down and subtract 2
const calcFuel = input => {
  return Math.floor(input/3) -2
}

