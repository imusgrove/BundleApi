module.exports = (sequelize, DataTypes) => {
  
  
  return sequelize.define("donors", {

    donor_lname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 30] }
      },
    donor_fname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 30] }
      },
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
      //   len: [4, 40]
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
};