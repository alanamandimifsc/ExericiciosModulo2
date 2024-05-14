function calculoImpostoRenda(salarioBruto) {
    let imposto = 0;
    if (salarioBruto > 2112.00 && salarioBruto <= 2826.65) {
        imposto = salarioBruto * 0.075;
    } else if (salarioBruto <= 3751.05) {
        imposto = salarioBruto * 0.15;
    } else if (salarioBruto <= 4664.68) {
        imposto = salarioBruto * 0.225;
    } else if (salarioBruto > 4664.68) {
        imposto = salarioBruto * 0.275;
    }
    return imposto;
}

module.exports = calculoImpostoRenda;