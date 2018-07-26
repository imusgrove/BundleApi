const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.PGDB, process.env.PGUSER, process.env.DBPASS, {
    dialect: 'postgres',
    port: 5432,
    host: process.env.PGHOST
    
});

sequelize.authenticate()
    .then(() => console.log('postgres database is connected'))
    .catch(err => console.log(err))

sequelize.sync();
module.exports = sequelize;
