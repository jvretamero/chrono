const formatoData = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" });

export const formatarData = function (data) {
    return formatoData.format(data);
};

export const gerarId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};