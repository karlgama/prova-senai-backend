const userDAO = require('./userDao.js');
const { InvalidArgumentError, InternalServerError } = require("../../errors");
const validations = require('../../validations')
const bcrypt = require('bcrypt');

class User {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;

        this.validate();
    }

    async addPassword(password) {
        validations.stringFieldNotNull(password, "password");
        validations.fieldMinSize(password, "password", 8);
        validations.fieldMaxSize(password, "password", 64);
        this.password = await User.generateHash(password);
    }

    static generateHash(password) {
        const custoHash = 12;
        return bcrypt.hash(password, custoHash);
      }

    validate() {
        validations.stringFieldNotNull(this.name, "name");
        validations.stringFieldNotNull(this.email, "email");
    }

    async create() {
        if (await User.findByEmail(this.email))
            throw new InvalidArgumentError("User already exists");

        return userDAO.create(this);
    }

    static async findByEmail(email) {
        const user = await userDAO.findByEmail(email);
        return user ? new User(user) : null;
    }

    static async findById(id) {
        const user = await userDAO.findById(id)
        return user ? new User(user) : null
    }

    static list() {
        return userDAO.list();
    }

  async delete() {
    return userDAO.delete(this);
  }

  static comparePassword(bodyPassword, passwordDb){
    return bcrypt.compare(bodyPassword,passwordDb)
  }
}

module.exports = User;