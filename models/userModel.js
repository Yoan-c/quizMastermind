const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: [true, "Ajouter un pseudo"],
    unique: true,
  },
  email: {
    type: String,
    validate: {
      validator: function (el) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(el);
      },
      message: `Entrez un email valide`,
    },
    require: [true, "Ajouter un email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Ajouter un mot de passe"],
    select: false,
    validate: {
      validator: function (el) {
        return el.length >= 6;
      },
      message: `Les mot de passe doit contenir 6 caractères minimum`,
    },
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirmer votre mot de passe"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: `Les mot de passe sont différents`,
    },
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(process.env.SECRET_TEXT, 10);
  }
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
