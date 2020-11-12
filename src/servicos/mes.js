const formatarMes = function (mes) {
    return new Date(2000, mes).toLocaleDateString({}, { month: "long" });
};

export const obterMeses = function () {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(formatarMes);
};