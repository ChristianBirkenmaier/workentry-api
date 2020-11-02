const mongoose = require("mongoose");

async function connect() {
    console.info("inside connection");
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.erlu7.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
    } catch (err) {
        console.error(err);
    }

    const db = mongoose.connection;
    const message = [];
    db.on("error", (e) => {
        // console.error.bind(console, "connection error:");
        console.error(e);
        message.push(e);
    });
    db.once("open", function () {
        console.info("MongoDB connected.");
        message.push("Connected to db");
    });

    return { db, message };
}
module.exports = connect;
