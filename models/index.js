const User = require('./User');
const Portfolio = require('./Portfolio');

User.hasOne(Portfolio, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Portfolio.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Portfolio };
