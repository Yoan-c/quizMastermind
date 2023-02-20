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
  quiz: [
    {
      category: String,
      nbQuestions: Number,
      score: {
        type: Number,
        default: 0,
      },
      idQuestion: [String],
      info: [
        {
          question: String,
          answer: String,
          userAnswer: String,
          success: Boolean,
          isAnswer: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  this.confirmPassword = undefined;
  next();
});

userSchema.statics.loginUser = async function (email, pseudo, password) {
  let user = null;
  let result = null;
  if (email) {
    user = await this.findOne({ email }).select("+password");
    if (user) result = await bcrypt.compare(password, user.password);
  } else {
    user = await this.findOne({ pseudo }).select("+password");
    if (user) result = await bcrypt.compare(password, user.password);
  }
  return user && result ? user._id : result;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
