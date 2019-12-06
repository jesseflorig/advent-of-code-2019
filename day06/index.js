const fs= require("fs");

const text = fs.readFileSync("./data").toString().trim();

const orbits = text
  .split('\n')
  .reduce((orbits, line) => {
    const [object1, object2] = line.trim().split(')');
    orbits[object2] = object1;
    return orbits;
  }, {});

const childPlanets = Object.keys(orbits);

// Count direct and indirect links
const solve1 = () => {
  let orbitCount = 0;

  childPlanets.map(planet => {
    let nextPlanet = orbits[planet];
    while (nextPlanet) {
      nextPlanet = orbits[nextPlanet];
      orbitCount += 1;
    }
  })

  return orbitCount;
}

// Find distance from YOU to SAN
const solve2 = () => {
  const distances = {};

  childPlanets.map(planet => {
    const visited = [];
    let nextPlanet = orbits[planet];
    let steps = 0;
    while (nextPlanet) {
      nextPlanet = orbits[nextPlanet];
      steps += 1;
      visited.push([ nextPlanet, steps ]);
    }
    distances[planet] = visited;
  })

  // Fand and walk to intersection from YOU
  const stepsToIntersection = distances['YOU']
    .filter(([ object ]) => distances['SAN'].find(([ otherObject ]) => object === otherObject))
    .sort((a, b) => a[1] - b[1])[0];

  // Walk to intersection from SAN
  const stepsFromIntersection = distances['SAN']
    .find(([object]) => object === stepsToIntersection[0]);

  return stepsToIntersection[1] + stepsFromIntersection[1];
};

console.log(`Result 1: ${solve1()}`)
console.log(`Result 2: ${solve2()}`)
