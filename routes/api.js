'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    let initNum = convertHandler.getNum(req.query.input);

    let initUnit = convertHandler.getUnit(req.query.input);

    if (!initNum && !initUnit) {
      res.send('invalid number and unit');
      return;
    } else if (!initNum) {
      res.send('invalid number');
      return;
    } else if (!initUnit) {
      res.send('invalid unit');
      return;
    }

    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);

    let unitText = convertHandler.spellOutUnit(initUnit);
    let returnUnitText = convertHandler.spellOutUnit(returnUnit);

    let string = convertHandler.getString(
      initNum,
      unitText,
      returnNum,
      returnUnitText
    );

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    });
  });

  app.use((req, res, next) => {
    res.status(404).type('text').send('Not Found');
  });
};
