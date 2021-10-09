const User = require("./User");
const Stock = require("./Stock");
const Fund = require("./Fund");
const Crypto = require("./Crypto");

// Stock.belongsToMany(User, { through: 'User_Portfolio' });
// Fund.belongsToMany(User, { through: 'User_Watchlist' });
Crypto.belongsToMany(User, { through: 'User_Crypto' });
User.belongsToMany(Crypto, { through: 'User_Crypto' });

module.exports = { User, Stock, Fund, Crypto };