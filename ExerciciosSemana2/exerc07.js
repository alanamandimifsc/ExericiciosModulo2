// Descrição: Crie uma função compor que recebe duas funções f e g e retorna uma nova função que é a
//  composição de f e g (ou seja, f(g(x))).

function compor(f, g) {
    return function (x) {
        return f(g(x));
    }
}

function somar1(x) {
    return x + 1;
}

function multiplicar2(x) {
    return x * 2;
}

let funcaoComposta = compor(somar1, multiplicar2);
console.log(funcaoComposta(5)); // 11
