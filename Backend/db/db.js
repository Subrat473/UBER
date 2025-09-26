const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    console.log("Mongo URI from env:", mongoUri); // Debug log

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

module.exports = connectToDb;
