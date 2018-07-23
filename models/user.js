module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users",
{
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len:[0,30],
            unique: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[0,40]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            isEmail: true
        }
    }
})
return Users;
}