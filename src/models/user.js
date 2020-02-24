const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100
  },
  sex: {
    type: String,
    validate: {
      validator: value => {
        const sex = ["masc", "fem"];
        return sex.some(el => el === value);
      },
      message: "sexo não existente"
    }
  }
});

module.exports = mongoose.model("User", userSchema);
