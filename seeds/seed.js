const sequelize = require('../config/connection');
const { Stock } = require('../models');
const { Fund } = require('../models');
const { Crypto } = require('../models');

const stockData = require('../seeds/stockData.json');
const fundData = require('../seeds/fundData.json');
const cryptoData = require('../seeds/cryptoData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const stock = await Stock.bulkCreate(stockData, {
      individualHooks: true,
      returning: true,
    });

    const fund = await Fund.bulkCreate(fundData, {
      individualHooks: true,
      returning: true,
    });

    const crypto = await Crypto.bulkCreate(cryptoData, {
      individualHooks: true,
      returning: true,
    });
  
  
    process.exit(0);
  } catch(err) {

  };

};

seedDatabase();