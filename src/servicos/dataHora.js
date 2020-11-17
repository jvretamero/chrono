const formatoData = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" });
const formatoHora = new Intl.DateTimeFormat("pt-BR", { timeStyle: "short" });

const pad = function (number) {
    return number < 10 ? "0" + number : number;
}

export const formatarDataParaInput = function (data) {
    return [
        data.getFullYear(),
        pad(data.getMonth() + 1),
        pad(data.getDate())
    ].join("-");
};

export const inputParaData = function (dataStr) {
    const parts = dataStr.substring(0, 10).split("-");
    return new Date(parts[0], parts[1] - 1, parts[2]);
};

export const formatarData = function (data) {
    return formatoData.format(data);
};

export const formatarHora = function (data) {
    return formatoHora.format(data);
}