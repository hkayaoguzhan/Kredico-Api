const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Mongodb Connection Success");
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports = connectDatabase;
