const calculoImpostoRenda = require('./calculo_imposto_renda');
const calculoInss = require('./calculo_inss');


function calculoSalarioLiquido(salarioBruto) {
    let salarioLiquido = salarioBruto - calculoInss(salarioBruto) - calculoImpostoRenda(salarioBruto);
    return salarioLiquido;

}

module.exports = calculoSalarioLiquido;