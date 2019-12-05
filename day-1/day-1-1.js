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
const calcFuelRequirement = mass => Math.floor(mass / 3) - 2;

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
const totalFuelReducer = (total, mass) => total + calcFuelRequirement(mass);

/**
 * @const {number}
 */
const totalFuelRequired = moduleMasses.reduce(totalFuelReducer, 0);

console.log(totalFuelRequired);
