const hoje = new Date();

export const mesAtual = function () {
    return hoje.getMonth();
};

export const anoAtual = function () {
    return hoje.getFullYear();
};

export const obterAnos = function () {
    var ano = anoAtual();

    return [
        ano - 1,
        ano,
        ano + 1
    ];
};

const formatarMes = function (mes) {
    return new Date(2000, mes).toLocaleDateString({}, { month: "long" });
};

export const obterMeses = function () {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(formatarMes);
};

export const calcularProximoMes = function (mes, ano) {
    if (mes == 11) {
        ano++;
        mes = 0;
    } else {
        mes++;
    }

    return { mes, ano };
};

export const calcularMesAnterior = function (mes, ano) {
    if (mes == 0) {
        ano--;
        mes = 11;
    } else {
        mes--;
    }

    return { mes, ano };
};