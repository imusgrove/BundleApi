module.exports = (sequelize, DataTypes) => {
  const Donors = sequelize.define("donors", {
    donor_username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 30],
        unique: true
      }
    },
    donor_password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 40]
      }
    },
    donor_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    donor_address: {
      type: DataTypes.STRING
    },
    donor_city: {
      type: DataTypes.STRING
    },
    donor_zipCode: {
      type: DataTypes.INTEGER
    },
    donor_phoneNumber: {
      type: DataTypes.INTEGER
    },
    donor_contactName: {
      type: DataTypes.STRING
    },
    Model: (associate = models => {
      donors.hasMany(models.donations);
    })
  });
  return Donors;
};
