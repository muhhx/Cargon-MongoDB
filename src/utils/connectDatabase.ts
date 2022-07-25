const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_URI as string);
    console.log("Database connected!");
  } catch (error) {
    console.log("Could not connect to the database.");
    process.exit(1);
  }
};
