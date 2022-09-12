const mongoose = require('mongoose');

const dbConnect =  async () => mongoose.connect(process.env.DB_URL);

module.exports = dbConnect;