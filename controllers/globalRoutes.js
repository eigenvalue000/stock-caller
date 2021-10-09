const router = require("express").Router();
const { queryApi } = require('sec-api');
const axios = require('axios').default;
const { Stock, User, Fund, Crypto } = require("../models");

router.get("/", (req, res) => {
  const { user } = req.session;
  res.render("login", { user });
});

router.get("/home", async (req, res) => {
  const { user } = req.session;
  res.render("home", { user });
});

// stockApiKey : 'pk_0abdbf47054f49cc85cd2f764323dbc7',
// var url = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${apiKey}`
router.get("/stock", async (req, res) => {
  const apiKey = 'pk_0abdbf47054f49cc85cd2f764323dbc7';
  const dbStockData = await Stock.findAll();
  for (let i = 0; i < dbStockData.length; i++) {
    console.log(dbStockData[i].dataValues.symbol, dbStockData[i].dataValues.price);
    var url = `https://cloud.iexapis.com/stable/stock/${dbStockData[i].dataValues.symbol}/quote?token=${apiKey}`;
    console.log(url);
    await axios.get(url)
      .then(function (response) {
        console.log(response.data.iexClose);
        Stock.update(
          { price: response.data.iexClose },
          { where: { symbol: dbStockData[i].dataValues.symbol } }
        );
      })
      .catch(function (e) {
        console.error(e);
      })
      .then(function () { });
  }
  const dbStockDataFinal = await Stock.findAll();
  console.log(dbStockDataFinal);
  res.render("home", { dbStockDataFinal });
});


const fs = require('fs');

router.get("/fund", async (req, res) => {
  const secApiKey = '709dd422135e9cd660a9fab79ca45c499d744d2f00e73d4f0dd6c60f55e69457';
  var url = `https://api.sec-api.io?token=${secApiKey}`;
  queryApi.setApiKey(secApiKey);

  const dbFundData = await Fund.findAll();
  for (let i = 0; i < dbFundData.length; i++) {
    
    var cik = dbFundData[i].dataValues.cik;
    const query = {
      query: { query_string: { query: `cik:${cik} AND formType:'13F'` } }, // get most recent 13F filings
      from: '0', // start with first filing. used for pagination.
      size: '2', // limit response to 2 filings
      sort: [{ filedAt: { order: 'desc' } }], // sort result by filedAt
    };
    const data = await queryApi.getFilings(query);

    // const content = JSON.stringify(data.filings[0]);

    // fs.writeFile('./public/log.txt', content, err => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    // });

    console.log(dbFundData[i].dataValues.cik);
    console.log(data.filings[0].companyName);
    if (!data.filings[0].ticker) {
      
    } else {
      console.log(data.filings[0].ticker);
    }
    
    console.log('Current ' + data.filings[0].holdings.length, data.filings[0].filedAt);
    var str1 = data.filings[0].filedAt;
    var currentArr = str1.split("T");
    console.log(currentArr);
    console.log('Past ' + data.filings[1].holdings.length, data.filings[1].filedAt);
    var str2 = data.filings[1].filedAt;
    var pastArr = str2.split("T");
    console.log(pastArr);
    console.log('Change in positions ', Math.abs(data.filings[0].holdings.length - data.filings[1].holdings.length));
    console.log('Difference ', data.filings[0].holdings.length - data.filings[1].holdings.length);
    if (data.filings[0].holdings.length - data.filings[1].holdings.length < 0) {
      console.log('Decreased positions');
      var tempString = 'decreased';
    } else if(data.filings[0].holdings.length - data.filings[1].holdings.length > 0) {
      console.log('Increased positions');
      var tempString = 'increased';
    } else {
      console.log('No positional change, but share holdings may have changed.');
      var tempString = "";
    }
    console.log('');
    console.log('');

    Fund.update(
    { name: data.filings[0].companyName,
      symbol: data.filings[0].ticker,
      currentPostionsTotal: data.filings[0].holdings.length,
      currentDate: currentArr[0],
      currentTime: currentArr[1],
      pastPositionsTotal: data.filings[1].holdings.length,
      pastDate: pastArr[0],
      pastTime: pastArr[1],
      changeInPositions: Math.abs(data.filings[0].holdings.length - data.filings[1].holdings.length),
      direction: tempString },
    { where: { cik: dbFundData[i].dataValues.cik } }
    );

    
  }

  const fundData = await Fund.findAll();

  res.render("home", { fundData });
});

// cryptoApiKey : 'd4145b9e978f5aa3b7d4e2382749dea9'
// var url = 'https://api.pro.coinbase.com/products/ETH-USD/ticker'


router.get("/crypto", async (req, res) => {

  const dbCryptoData = await Crypto.findAll();

  // https://api.pro.coinbase.com/products/ETH-USD/ticker
  for (let i = 0; i < dbCryptoData.length; i++) {
    console.log(dbCryptoData[i].dataValues.symbol);
    var url1 = `https://api.pro.coinbase.com/products/${dbCryptoData[i].dataValues.symbol}-USD/candles`;
    var url2 = `https://api.pro.coinbase.com/products/${dbCryptoData[i].dataValues.symbol}-USD/ticker`;
    
    // console.log(url);
    await axios.get(url1)
      .then(function (response) {
        // console.log(response.data);
      })
      .catch(function (e) {
        console.error(e);
      })
      .then(function () { });

    await axios.get(url2)
    .then(function (response) {
      console.log(response.data.price);
      Crypto.update(
      { price: response.data.price }
      ,{ where: { symbol: dbCryptoData[i].dataValues.symbol } });
    })
    .catch(function (e) {
      console.error(e);
    })
    .then(function () {});

  }
  const dbCryptoDataFinal = await Crypto.findAll();
  // console.log(dbCryptoDataFinal);
  res.render("home", { dbCryptoDataFinal });
});

router.get("/login", (req, res) => {
  const { user } = req.session;
  res.render("login", { user });
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      return res.render("login", { message: "User not found, please register." });
    }

    const isValid = await userData.checkPass(req.body.password);

    if (isValid) {
      req.session.save(() => {
        req.session.is_logged_in = true;
        req.session.user = {
          username: userData.username,
          bio: userData.bio,
        };
        return res.redirect("/home");
      });
    } else {
      console.log("🤷‍♂️");
      res.render("login", { message: "Invalid password." });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(user);
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
});


router.get("/logout", (req, res) => {
  res.render('login');
});

router.post('/logout', async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy();
    res.render('login');
  } else {
    res.status(404).end();
  }
});

module.exports = router;