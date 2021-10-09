const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Stock extends Model { };

Stock.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        symbol: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        note: {
            type: DataTypes.TEXT,
          },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "stock",
    }
);

module.exports = Stock;