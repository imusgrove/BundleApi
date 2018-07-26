const sequelize = require("./db");
const Donors = sequelize.model("donors");
const Donations = sequelize.model("donations")

Donations.belongsTo(Donors);
Donors.hasMany(Donations);