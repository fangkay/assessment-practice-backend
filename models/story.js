"use strict";
const { Model } = require("sequelize");
const favorites = require("./favorites");
module.exports = (sequelize, DataTypes) => {
  class story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      story.belongsTo(models.space, { foreignKey: "spaceId" });
      story.belongsToMany(models.user, {
        through: "favorites",
        foreignKey: "storyId",
      });
    }
  }
  story.init(
    {
      name: DataTypes.STRING,
      content: DataTypes.TEXT,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "story",
    }
  );
  return story;
};
