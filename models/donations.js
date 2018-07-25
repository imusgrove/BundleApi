module.exports = (sequelize, DataTypes) => {
  const Donor = sequelize.define("donors");
  const Donations = sequelize.define("donations");

  return sequelize.define("donations", {
    used_clothing: {
      type: DataTypes.INTEGER
    },
    new_clothing: {
      type: DataTypes.INTEGER
    },
    used_shoes: {
      type: DataTypes.INTEGER
    },
    new_shoes: {
      type: DataTypes.INTEGER
    },
    baby_food: {
      type: DataTypes.INTEGER
    },
    diaper_bags: {
      type: DataTypes.INTEGER
    },
    bottles: {
      type: DataTypes.INTEGER
    },
    pacifiers: {
      type: DataTypes.INTEGER
    },
    diapers_boxes: {
      type: DataTypes.INTEGER
    },
    beds: {
      type: DataTypes.INTEGER
    },
    misc_items: {
      type: DataTypes.STRING
    },
  });
  // Donations.belongsTo(Donor)
};
