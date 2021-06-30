onload = () => {
    document.querySelector('#bt-0').onclick = () => digito(0);
    document.querySelector('#bt-1').onclick = () => digito(1);
    document.querySelector('#bt-2').onclick = () => digito(2);
    document.querySelector('#bt-3').onclick = () => digito(3);
    document.querySelector('#bt-4').onclick = () => digito(4);
    document.querySelector('#bt-5').onclick = () => digito(5);
    document.querySelector('#bt-6').onclick = () => digito(6);
    document.querySelector('#bt-7').onclick = () => digito(7);
    document.querySelector('#bt-8').onclick = () => digito(8);
    document.querySelector('#bt-9').onclick = () => digito(9);
    document.querySelector('#bt-comma').onclick = virgula;
    document.querySelector('#bt-ac').onclick = limpa;
    document.querySelector('#bt-divide').onclick = () => operador('/');
    document.querySelector('#bt-times').onclick = () => operador('*');
    document.querySelector('#bt-minus').onclick = () => operador('-');
    document.querySelector('#bt-plus').onclick = () => operador('+');
    document.querySelector('#bt-equals').onclick = calcula;
};

// Variáveis para armazenarmos o valor, o perador e o estado da calculadora
let sValor = '0'; // Valor que será apresentado no display
let eNovoNumero = true; // Indica se o próximo digita será de um novo número
let valorAnterior = 0; // Valor acumulado para uma operação
let operacaoPendente = null; // Operação acumulada


// Atualização do Visor
const atualizaVisor = () => {
    let [parteInteira, parteDecimal] = sValor.split(',');
    let v = '';
    c = 0;
    for (let i = parteInteira.length - 1; i >= 0; i--) {
        if (++c > 3) {
            v = '.' + v;
            c = 1;
        }
        v = parteInteira[i] + v;
    }
    v = v + (parteDecimal ? ',' + parteDecimal : '')
    document.querySelector('#display').innerText = v;
};


// Tratamento do onClick no digito
const digito = (n) => {
    if (eNovoNumero) {
        sValor = '' + n;
        eNovoNumero = false;
    } else sValor += n;
    atualizaVisor();
};

// Tratamento do onClick na virgula
const virgula = () => {
    if (eNovoNumero) {
        sValor = '0,';
        eNovoNumero = false;
    } else if (sValor.indexOf(',') == -1) sValor += ',';
    atualizaVisor();
};

// Tratamento do onClick no AC(all clear)
const limpa = () => {
    eNovoNumero = true;
    valorAnterior = 0;
    sValor = '0';
    operacaoPendente = null;
    atualizaVisor();
};
// Converte a string do valor para um número real
const valorAtual = () => parseFloat(sValor.replace(',', '.'))

// Tratamento no onClick nos operadores
const operador = (op) => {
    calcula();
    valorAnterior = valorAtual();
    operacaoPendente = op;
    eNovoNumero = true;
};

const calcula = () => {
    if (operacaoPendente != null) {
        let resultado;
        switch (operacaoPendente) {
            case '+':
                resultado = valorAnterior + valorAtual();
                break;
            case '-':
                resultado = valorAnterior - valorAtual();
                break;
            case '*':
                resultado = valorAnterior * valorAtual();
                break;
            case '/':
                resultado = valorAnterior / valorAtual();
                break;
        }
        sValor = resultado.toString().replace('.', ',');
    }
    eNovoNumero = true;
    operacaoPendente = null;
    valorAnterior = 0;
    atualizaVisor();
};
