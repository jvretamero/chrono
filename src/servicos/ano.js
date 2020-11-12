const hoje = new Date();

export const obterAnoAtual = function () {
    return hoje.getFullYear();
};

export const obterAnos = function () {
    var anoAtual = obterAnoAtual();

    return [
        anoAtual - 1,
        anoAtual,
        anoAtual + 1
    ];
};