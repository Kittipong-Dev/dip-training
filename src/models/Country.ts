import { sequelize } from "../database"
import { DataTypes } from "sequelize"

export const Country = sequelize.define(
    "Country", 
    { 
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        capital: DataTypes.STRING,
    },
  { paranoid: true },
);