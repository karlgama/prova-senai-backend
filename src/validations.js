const { InvalidArgumentError } = require('./errors');


module.exports = {
  stringFieldNotNull: (valor, name) => {
    if (typeof valor !== 'string' || valor === 0)
      throw new InvalidArgumentError(`É necessário preencher o campo ${name}!`);
  },

  fieldMinSize: (valor, name, minimo) => {
    if (valor.length < minimo)
      throw new InvalidArgumentError(
        `O campo ${name} precisa ser maior que ${minimo} caracteres!`
      );
  },

  fieldMaxSize: (valor, name, maximo) => {
    if (valor.length > maximo)
      throw new InvalidArgumentError(
        `O campo ${name} precisa ser menor que ${maximo} caracteres!`
      );
  }
};