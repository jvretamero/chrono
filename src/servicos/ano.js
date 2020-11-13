export const obterAnos = function () {
    var anoAtual = new Date().getFullYear();

    return [
        anoAtual - 1,
        anoAtual,
        anoAtual + 1
    ];
};