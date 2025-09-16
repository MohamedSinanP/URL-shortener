const mongoose = require('mongoose');

async function connectDb() {
  try {
    mongoose.connect(process.env.MONGO_URL, {})
    console.log("Mongodb connected successfully");
  } catch (error) {
    process.exit(1)
  }
}

module.exports = connectDb;