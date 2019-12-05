const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), {
  encoding: 'utf8'
});

/**
 * Produces an array of module masses from a data string
 *
 * @param {string} massStr - A string of module masses from the input file separated by an EOL character
 *
 * @return {number[]} An array of module masses
 *
 * @example
 *
 *    parsemoduleMasses('100 200 300')
 */
const parseModuleMasses = massStr =>
  massStr
    .trim()
    .split(/\r\n|\r|\n/)
    .map(massStr => parseInt(massStr, 10));

/**
 * @const {number[]}
 */
const moduleMasses = parseModuleMasses(data);

/**
 * Produces the fuel requirement for a given mass
 *
 * @param {number} mass - A module's mass
 *
 * @return {number} The fuel requirement
 *
 * @example
 *
 *    calcFuelRequirement(100)
 */
const calcFuelRequirement = mass => {
  const fuel = Math.floor(mass / 3) - 2;
  return fuel < 0 ? 0 : fuel;
};

/**
 * Recursive function that produces the total fuel requirement of a module given its mass
 * and the mass added by additional fuel
 *
 * @param {number} mass - The mass of a module or added fuel
 * @param {number} [totalFuelRequired = 0] - The running total of fuel required for a module
 *
 * @return {number} - The total fuel requirement for a module
 *
 * @example
 *
 *    calcModuleFuelRequirement(100)
 */
const calcModuleFuelRequirement = (mass, totalFuelRequired = 0) => {
  if (mass <= 0) {
    return totalFuelRequired;
  }

  const fuelRequired = calcFuelRequirement(mass);

  return calcModuleFuelRequirement(
    fuelRequired,
    totalFuelRequired + fuelRequired
  );
};

/**
 * Reducer function that produces a total fuel requirement for an array of module masses
 *
 * @param {number} total - The total fuel requirement for the given module, accumulator
 * @param {number} mass - The mass of the current module
 *
 * @return {number} The sum of the accumulated total and the current module's total fuel requirement
 *
 * @example
 *
 *    arrayOfMasses.reduce(totalFuelReducer)
 */
const totalFuelReducer = (total, mass) =>
  total + calcModuleFuelRequirement(mass);

/**
 * @const {number}
 */
const totalFuelRequired = moduleMasses.reduce(totalFuelReducer, 0);

console.log(totalFuelRequired);
