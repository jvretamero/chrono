const hoje = new Date();

export const mesAtual = function () {
    return hoje.getMonth();
};

export const anoAtual = function () {
    return hoje.getFullYear();
};

export const obterAnos = function () {
    const ano = anoAtual();

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

export const calcularDias = function (mes, ano) {
    const totalDias = new Date(ano, mes + 1, 0).getDate();
    const primeiroDia = new Date(ano, mes);
    const didSemanaInicial = primeiroDia.getDay();
    const semanas = [];

    let dia = 1;

    for (let semana = 0; semana < 6; semana++) {
        const diasSemana = [];

        for (let diaSemana = 0; diaSemana < 7; diaSemana++) {
            let naoComecouMes = semana == 0 && diaSemana < didSemanaInicial;
            let terminouMes = dia > totalDias;

            if (naoComecouMes || terminouMes) {
                diasSemana.push(_criarDiaMes());
            } else {
                diasSemana.push(_criarDiaMes(ano, mes, dia));
                dia++;
            }
        }

        semanas.push(diasSemana);
    }

    return semanas;
};

const _criarDiaMes = function (ano, mes, dia) {
    let diaMes = {};

    if (ano != null && mes != null && dia != null) {
        diaMes.numero = dia;
        diaMes.data = new Date(ano, mes, dia);
    }

    return diaMes;
};