'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, { DataTypes }) => {
  class Facility extends Model {
  };
  Facility.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
       type: DataTypes.STRING, allowNull: false, defaultValue: '',
       validate: {
           isAlpha: true
       }
    },
    city: {
       type: DataTypes.STRING, allowNull: false, defaultValue: '',
       validate: {
           isAlpha: true
       }
    },
    zip: {
       type: DataTypes.STRING, allowNull: false, defaultValue: '',
       validate: {
           is: /(^\d{5}$)|(^\d{5}-\d{4}$)/
       }
    },
    county: {
       type: DataTypes.STRING, allowNull: false, defaultValue: '',
       validate: {
           isAlpha: true
       }
    },
    phone: {
       type: DataTypes.STRING, allowNull: false, defaultValue: '',
       validate: {
           is: /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/
       }
    },
    type: {
       type: DataTypes.STRING, allowNull: false, defaultValue: '',
       validate: {
           isAlpha: true
       }
    },
    capacity: {
       type: DataTypes.STRING, allowNull: false, defaultValue: '',
       validate: {
           isNumeric: true
       }
    },
    capacity: {
       type: DataTypes.JSON, allowNull: false, defaultValue: ''
    },
  }, {
    sequelize,
    timestamps: true,
    modelName: 'facility',
  });
  return Facility;
};