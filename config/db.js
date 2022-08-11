const mongoose = require('mongoose');

const db = "mongodb://localhost:27017/myChartApp"
const connectDB = () => {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log(`MongoDB Connected... ${db}`);
        })
        .catch(err => {
            console.log(err.message);
            process.exit(1);
        });
};


module.exports = connectDB;