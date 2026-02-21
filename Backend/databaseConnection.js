const mongoose = require("mongoose");

function connectToDatabase() {
    const DB_URL = process.env.MONGO_URL;

    mongoose.connect(DB_URL)
        .then(() => {
            console.log("Database Connected Successfully ....");
        })
        .catch((error) => {
            console.error("Connection Error:", error);
        });
}

module.exports = connectToDatabase;