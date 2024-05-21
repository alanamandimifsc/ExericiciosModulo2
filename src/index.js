const calculoSalarioLiquido = require('./calculo_salario_liquido');
const calculoInss = require('./calculo_inss');
const calculoImpostoRenda = require('./calculo_imposto_renda');
const readline = require('readline-sync');
const puppeteer = require('puppeteer');

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Verifica o tamanho e sequências repetidas

    let soma = 0, resto;

    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

function validarSalario(salario) {
    return !isNaN(salario) && salario > 0;
}

const nomeCompleto = readline.question('Digite seu nome completo: ');
let cpf = readline.question('Digite seu CPF: ');
while (!validarCPF(cpf)) {
    console.log("CPF inválido. Tente novamente.");
    cpf = readline.question('Digite seu CPF: ');
}

let salarioBruto = readline.question('Digite seu salário bruto: ');
while (!validarSalario(Number(salarioBruto))) {
    console.log("Salário inválido. Tente novamente.");
    salarioBruto = readline.question('Digite seu salário bruto: ');
}

const salarioLiquido = calculoSalarioLiquido(Number(salarioBruto));

console.log("--- Folha de Pagamento ---");
console.log(`Nome: ${nomeCompleto}`);
console.log(`CPF: ${cpf}`);
console.log(`Salário Bruto: R$ ${salarioBruto}`);
console.log(`INSS: R$ ${calculoInss(Number(salarioBruto))}`);
console.log(`Imposto de Renda: R$ ${calculoImpostoRenda(Number(salarioBruto))}`);
console.log(`Salário Líquido: R$ ${salarioLiquido}`);
console.log("--------------------------");

const respostaPDF = readline.question('Deseja gerar um PDF? (S/N)');
if (respostaPDF.toUpperCase() === 'S') {
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const conteudo = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Folha de Pagamento</title>
        </head>
        <body>
            <h1>Folha de Pagamento</h1>
            <p>Nome: ${nomeCompleto}</p>
            <p>CPF: ${cpf}</p>
            <p>Salário Bruto: R$ ${salarioBruto}</p>
            <p>INSS: R$ ${calculoInss(Number(salarioBruto))}</p>
            <p>Imposto de Renda: R$ ${calculoImpostoRenda(Number(salarioBruto))}</p>
            <p>Salário Líquido: R$ ${salarioLiquido}</p>
        </body>
        </html>
        `;

        await page.setContent(conteudo);
        await page.pdf({ path: 'folha_de_pagamento.pdf', format: 'A4' });

        await browser.close();
        console.log('PDF gerado com sucesso!');
    })().catch(err => {
        console.error('Erro ao gerar PDF:', err);
    });
}
