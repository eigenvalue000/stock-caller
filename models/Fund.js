const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Fund extends Model { };

Fund.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        symbol: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        note: {
            type: DataTypes.TEXT,
        },
        cik: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        currentPostionsTotal: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        currentDate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        currentTime: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pastPositionsTotal: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        pastDate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pastTime: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        changeInPositions: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        direction: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "fund",
    }
);

module.exports = Fund;