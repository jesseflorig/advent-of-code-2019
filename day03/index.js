// DAY 3

// Needs a refactor. Completed part 2 by hand by running clacFirstCross
// and then hardcoding the coords in layWire :/
const fs = require("fs");
const _ = require("lodash")

fs.readFile("data", "utf8", (err, data) => {
  const [wire1, wire2] = data.trim().split("\n").map(wire => wire.split(","))
  console.log(`Result 1: ${calcNearestCross(wire1, wire2)}`);
  // console.log(`Result 2: ${calcFirstCross(wire1, wire2)}`)
});

const calcNearestCross = (wire1, wire2) => {
  const wire1Path = layWire(wire1)
  const wire2Path = layWire(wire2)
  const crosses = _.intersection(wire1Path, wire2Path)
  return shortestDistance(crosses)
}

const calcFirstCross = (wire1, wire2) => {
  const wire1Path = layWire(wire1)
  const wire2Path = layWire(wire2)
  let lay1 = []
  let lay2 = []
  let idx = 0
  let firstCross = null
  while(!firstCross){
    lay1.push(wire1Path[idx])
    lay2.push(wire2Path[idx])
    const crosses = _.intersection(lay1, lay2)
    if(crosses.length > 0) firstCross = crosses[0]
    idx++
  }
  console.log(firstCross)
}

const layWire = wire => {
  let path = []
  let x = 0
  let y = 0
  let steps = 0
  wire.map(coord => {
    const direction = coord.substr(0,1)
    let distance = parseInt(coord.substr(1))
    while(distance){
      switch(direction){
        case "L":
            x -= 1
          break
        case "R":
            x += 1
          break
        case "U":
            y += 1
          break
        case "D":
            y -= 1
          break
      }
      path.push(`${x},${y}`)
      steps++
      if(x===367 && y ===0) console.log("STEPS",steps)
      distance--
    }
  })
  return path
}

const shortestDistance = crosses => {
  let distances = []
  crosses.map(cross => {
    const [x, y] = cross.split(",").map(i => parseInt(i))
    distances.push(Math.abs(x) + Math.abs(y))
  })
  return Math.min(...distances)
}
