const formatoData = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" });
const formatoHora = new Intl.DateTimeFormat("pt-BR", { timeStyle: "short" });

export const formatarData = function (data) {
    return formatoData.format(data);
};

export const formatarHora = function (data) {
    return formatoHora.format(data);
}