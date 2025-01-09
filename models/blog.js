'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Blog.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      // define association here
    }
  }
  Blog.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      startDate: DataTypes.STRING,
      endDate: DataTypes.STRING,
      image: DataTypes.STRING,
      teknologi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Blog',
    }
  );
  return Blog;
};
