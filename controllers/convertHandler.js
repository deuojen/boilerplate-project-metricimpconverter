const { text } = require('body-parser');

function ConvertHandler() {
  let regex = /(gal)|(l)|(mi)|(km)|(lbs)|(kg)/gi;
  let converts = [
    {
      source: 'gal',
      target: 'L',
      text: 'gallons',
    },
    {
      source: 'L',
      target: 'gal',
      text: 'liters',
    },
    {
      source: 'mi',
      target: 'km',
      text: 'miles',
    },
    {
      source: 'km',
      target: 'mi',
      text: 'kilometers',
    },
    {
      source: 'lbs',
      target: 'kg',
      text: 'pounds',
    },
    {
      source: 'kg',
      target: 'lbs',
      text: 'kilograms',
    },
  ];

  this.getNum = function (input) {
    let result;
    let cleanNumber = input.replace(/[^0-9.\/]/gi, '');
    //console.log('123' + cleanNumber);
    if (cleanNumber.length == 0) {
      return 1;
    }
    let splitText = cleanNumber.split('/');
    //console.log(splitText);
    if (splitText.length == 1) {
      result = parseFloat(cleanNumber);
    } else if (splitText.length == 2) {
      result = parseFloat(splitText[0]) / parseFloat(splitText[1]);
    }
    console.log(input);
    console.log(result);
    return result;
  };

  this.getUnit = function (input) {
    let result;
    let cleanText = input.replace(/[^A-Za-z]+/g, '');
    result = converts.find(
      (x) => x.source.toLowerCase() == cleanText.toLowerCase()
    );
    // console.log(cleanNumber);
    console.log(cleanText);
    // console.log(result);
    return result?.source ?? undefined;
  };

  this.getReturnUnit = function (initUnit) {
    let result = converts.find(
      (x) => x.source.toLowerCase() == initUnit.toLowerCase()
    );

    return result?.target ?? undefined;
  };

  this.spellOutUnit = function (unit) {
    let result = converts.find((x) => x.source == unit);

    return result.text;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = Math.round(initNum * galToL * 100000) / 100000;
        break;
      case 'L':
        result = Math.round((initNum / galToL) * 100000) / 100000;
        break;
      case 'mi':
        result = Math.round(initNum * miToKm * 100000) / 100000;
        break;
      case 'km':
        result = Math.round((initNum / miToKm) * 100000) / 100000;
        break;
      case 'lbs':
        result = Math.round(initNum * lbsToKg * 100000) / 100000;
        break;
      case 'kg':
        result = Math.round((initNum / lbsToKg) * 100000) / 100000;
        break;
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;

    return result;
  };
}

module.exports = ConvertHandler;
