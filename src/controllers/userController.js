const User = require("../models/User")
const { InvalidArgumentError, InternalServerError } = require("../errors")
const jwt = require("jsonwebtoken");

class UserController {
  static async list(req, res) {
    const users = await User.list();
    res.json(users);
  }

  static async create(req, res) {
    const { name, email, password } = req.body;

    try {
      const user = new User({
        name,
        email,
      });

      await user.addPassword(password);
      await user.create();

      res.status(201).json();
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        res.status(422).json({ erro: erro.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: erro.message });
      }
    }
  }
  static async findById(req, res) {
    const { id } = req.params
    const user = await User.findById(id)
    res.status(200).json(user)
  }
  static async delete(req, res) {
    const user = await User.findById(req.params.id)
    try {
      await user.delete();
      res.status(204).send()
    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
  }

  static async login(req, res) {
    const {email,password} = req.body
    const user = await User.findByEmail(email);
    const token = await UserController.buildToken(user);
    res.set("Authorization", token);
    res.status(204).send();
  }

  static async buildToken(user) {
    const payload = {
      id: user.id,
    };
    console.log("build user: ", user)
    const token = jwt.sign(payload, `${process.env.SECRET_JWT}`, {
      expiresIn: "15m",
    });
    console.log("build token",payload)
    return token;
  }


}

module.exports = UserController;