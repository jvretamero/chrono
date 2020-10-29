var ready = function (fn) {
    if (document.readyState === 'complete')
        return fn();

    document.addEventListener('DOMContentLoaded', fn, false);
};

ready(function () {
    var formatoData = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" });
    var formatoHora = new Intl.DateTimeFormat("pt-BR", { timeStyle: "short" });

    var dataSelecionada = document.getElementById("data-selecionada");

    var hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    var calendario = window.calendario(atualizarAgendamentos);
    calendario.iniciar(hoje);

    var navegacaoMes = window.navegacaoMes(calendario.atualizarMes);
    navegacaoMes.iniciar(hoje);

    var modal = window.modal();

    var elAgendamento = {
        form: document.getElementById("ag-form"),
        data: document.getElementById("ag-data"),
        hora: {
            inicial: document.getElementById("ag-hora-inicial"),
            final: document.getElementById("ag-hora-final")
        },
        assunto: document.getElementById("ag-assunto"),
        categoria: document.getElementById("ag-categoria"),
        notas: document.getElementById("ag-notas")
    };

    function novoAgendamento() {
        var horaInicial = new Date();
        var horaFinal = new Date(horaInicial.getTime() + (60 * 60 * 1000));

        elAgendamento.data.valueAsNumber = calendario.obterDiaSelecionado().getTime();
        elAgendamento.hora.inicial.value = formatoHora.format(horaInicial);
        elAgendamento.hora.final.value = formatoHora.format(horaFinal);

        modal.abrir();

        elAgendamento.assunto.focus();
    }

    function salvarAgendamento() {
        modal.fechar();
    }

    function atualizarAgendamentos(dia) {
        dataSelecionada.innerText = formatoData.format(dia);
    }

    elAgendamento.form.addEventListener("submit", function (e) {
        e.preventDefault();

        //TODO validar campos

        salvarAgendamento();
    });

    document.getElementById("novo-agendamento").addEventListener("click", novoAgendamento);
});