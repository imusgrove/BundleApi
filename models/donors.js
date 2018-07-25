module.exports = (sequelize, DataTypes) => {
 
  const Donor = sequelize.define('donors')
  const Donations = sequelize.define('donations')

  
  return sequelize.define("donors", {
    donor_username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 30]
      },
      unique: {
        args: true,
        msg: 'Username already exists!'
    }
    },
    donor_password: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   len: [0, 40]
      // }
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
    donor_state: {
      type: DataTypes.STRING
    },
    donor_zipCode: {
      type: DataTypes.INTEGER
    },
    donor_phoneNumber: {
      type: DataTypes.STRING
    },
    donor_contactName: {
      type: DataTypes.STRING
    }
  });
  
  // Donor.hasMany(Donations)

  
};

