const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  // #1
  test('convertHandler should correctly read a whole number input.', function () {
    assert.equal(123, convertHandler.getNum('123'));
  });
  // #2
  test('convertHandler should correctly read a decimal number input.', function () {
    assert.equal(1.23, convertHandler.getNum('1.23'));
  });
  // #3
  test('convertHandler should correctly read a fractional input.', function () {
    assert.equal(1 / 23, convertHandler.getNum('1/23'));
  });
  // #4
  test('convertHandler should correctly read a fractional input with a decimal.', function () {
    assert.equal(2.5 / 6, convertHandler.getNum('2.5/6'));
  });
  // #5
  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
    assert.isUndefined(undefined, convertHandler.getNum('3/2/3'));
  });
  // #6
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
    assert.equal(1, convertHandler.getNum('mi'));
  });
  // #7
  test('convertHandler should correctly read each valid input unit.', function () {
    assert.equal('gal', convertHandler.getUnit('GAL'));
    assert.equal('L', convertHandler.getUnit('l'));
    assert.equal('mi', convertHandler.getUnit('MI'));
    assert.equal('km', convertHandler.getUnit('KM'));
    assert.equal('lbs', convertHandler.getUnit('LBS'));
    assert.equal('kg', convertHandler.getUnit('KG'));
  });
  // #8
  test('convertHandler should correctly return an error for an invalid input unit.', function () {
    assert.isUndefined(undefined, convertHandler.getUnit('kgp'));
  });
  // #9
  test('convertHandler should return the correct return unit for each valid input unit.', function () {
    assert.equal('gal', convertHandler.getReturnUnit('L'));
    assert.equal('L', convertHandler.getReturnUnit('gal'));
    assert.equal('mi', convertHandler.getReturnUnit('km'));
    assert.equal('km', convertHandler.getReturnUnit('mi'));
    assert.equal('lbs', convertHandler.getReturnUnit('kg'));
    assert.equal('kg', convertHandler.getReturnUnit('lbs'));
  });
  // #10
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
    assert.equal('gallons', convertHandler.spellOutUnit('gal'));
    assert.equal('liters', convertHandler.spellOutUnit('L'));
    assert.equal('miles', convertHandler.spellOutUnit('mi'));
    assert.equal('kilometers', convertHandler.spellOutUnit('km'));
    assert.equal('pounds', convertHandler.spellOutUnit('lbs'));
    assert.equal('kilograms', convertHandler.spellOutUnit('kg'));
  });
  // #11
  test('convertHandler should correctly convert gal to L.', function () {
    assert.equal(3.78541, convertHandler.convert(1, 'gal'));
  });
  // #12
  test('convertHandler should correctly convert L to gal', function () {
    assert.equal(0.26417, convertHandler.convert(1, 'L'));
  });
  // #13
  test('convertHandler should correctly convert mi to km.', function () {
    assert.equal(1.60934, convertHandler.convert(1, 'mi'));
  });
  // #14
  test('convertHandler should correctly convert km to mi.', function () {
    assert.equal(0.62137, convertHandler.convert(1, 'km'));
  });
  // #15
  test('convertHandler should correctly convert lbs to kg.', function () {
    assert.equal(0.45359, convertHandler.convert(1, 'lbs'));
  });
  // #16
  test('convertHandler should correctly convert kg to lbs.', function () {
    assert.equal(2.20462, convertHandler.convert(1, 'kg'));
  });
});
