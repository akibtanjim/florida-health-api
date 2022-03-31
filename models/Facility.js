"use strict";
const { Model } = require("sequelize");
const { chunkArray } = require("../helpers/utils");

module.exports = (sequelize, { DataTypes }) => {
  class Facility extends Model {
    static async bullkInsertInChunk(data) {
      const chunkedData = chunkArray(data, 10);
      return sequelize.transaction(async t => {
        return chunkedData.map(async items => {
          return this.bulkCreate(items, {
            ignoreDuplicates: true,
            transaction: t,
          })
            .then(() => {
              return true;
            })
            .catch(e => {
              console.log(e);
              return true;
            });
        });
      });
    }
  }
  Facility.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        defaultValue: "",
        validate: {
          isAlpha: true,
        },
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        defaultValue: "-",
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        validate: {
          isAlpha: true,
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        validate: {
          isAlpha: true,
        },
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        validate: {
          isAlpha: true,
        },
      },
      zip: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        validate: {
          is: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
        },
      },
      county: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "-",
        validate: {
          isAlpha: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        validate: {
          is: /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/,
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        validate: {
          isAlpha: true,
        },
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isNumeric: true,
        },
      },
      images: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "facility",
    }
  );

  return Facility;
};
