module.exports = (sequelize, DataTypes) => {
    return sequelize.define("users",
{
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len:[0,30],
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len:[0,30],
        }
    },
    
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len:[0,30],
        },
        unique: {
            args: true,
            msg: 'Username already exists!'
        }
    },
    passwordhash:{
        type: DataTypes.STRING,
        allowNull:false,
        // validate:{
        //     len:[0,40]
        // }
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            isEmail: true
        }
    }, 
    
})

}


