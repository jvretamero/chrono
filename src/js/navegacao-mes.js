export default function (callback) {

    var selectMes = document.getElementById("select-mes");
    var selectAno = document.getElementById("select-ano");

    var botaoProximoMes = document.getElementById("btn-proximo-mes");
    var botaoMesAnterior = document.getElementById("btn-mes-anterior");

    var formatarMes = function (mes) {
        return new Date(2000, mes).toLocaleDateString({}, { month: "long" });
    };

    var obterMeses = function () {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(formatarMes);
    };

    var popularMeses = function () {
        var meses = obterMeses();

        selectMes.innerText = "";

        for (var indiceMes in meses) {
            var option = document.createElement("option");
            option.value = indiceMes;
            option.innerText = meses[indiceMes];

            selectMes.appendChild(option);
        }
    };

    var obterMes = function () {
        return selectMes.value;
    };

    var definirMes = function (mesAtual) {
        selectMes.value = mesAtual;
    };

    var gerarAnos = function (data) {
        var anoAtual = data.getFullYear();

        return [
            anoAtual - 1,
            anoAtual,
            anoAtual + 1
        ];
    };

    var popularAnos = function (data) {
        var anos = gerarAnos(data);

        selectAno.innerText = "";

        for (var ano of anos) {
            var option = document.createElement("option");
            option.value = ano;
            option.innerText = ano;

            selectAno.appendChild(option);
        }
    };

    var obterAno = function () {
        return selectAno.value;
    };

    var definirAno = function (ano) {
        selectAno.value = ano;
    };

    function proximoMes() {
        var mes = obterMes();
        var ano = obterAno();

        if (mes == 11) {
            ano++;
            mes = 0;
        } else {
            mes++;
        }

        definirMes(mes);
        definirAno(ano);

        notificarModificacao();
    }

    function mesAnterior() {
        var mes = obterMes();
        var ano = obterAno();

        if (mes == 0) {
            ano--;
            mes = 11;
        } else {
            mes--;
        }

        definirMes(mes);
        definirAno(ano);

        notificarModificacao();
    };

    var notificarModificacao = function () {
        var mes = obterMes();
        var ano = obterAno();

        if (callback)
            callback(mes, ano);
    };

    var iniciarEventos = function () {
        botaoProximoMes.addEventListener("click", proximoMes);
        botaoMesAnterior.addEventListener("click", mesAnterior);

        selectMes.addEventListener("change", notificarModificacao);
        selectAno.addEventListener("change", notificarModificacao);
    };

    var iniciar = function (data) {
        popularMeses();
        popularAnos(data);

        definirMes(data.getMonth());
        definirAno(data.getFullYear());

        iniciarEventos();
    };

    return {
        iniciar: iniciar,

        obterMes: obterMes,
        definirMes: definirMes,

        obterAno: obterAno,
        definirAno: definirAno
    };
};