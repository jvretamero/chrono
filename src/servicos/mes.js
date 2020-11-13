const formatarMes = function (mes) {
    return new Date(2000, mes).toLocaleDateString({}, { month: "long" });
};

export const obterMeses = function () {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(formatarMes);
};

export const obterProximoMes = function (mes, ano) {
    if (mes == 11) {
        ano++;
        mes = 0;
    } else {
        mes++;
    }

    return { mes, ano };
};

export const obterMesAnterior = function (mes, ano) {
    if (mes == 0) {
        ano--;
        mes = 11;
    } else {
        mes--;
    }

    return { mes, ano };
};