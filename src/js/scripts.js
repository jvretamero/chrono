document.addEventListener("DOMContentLoaded", function () {
    var formatoData = new Intl.DateTimeFormat("pt-BR");

    var dataSelecionada = document.getElementById("data-selecionada");

    var hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    var diaSelecionado = hoje;

    var calendario = window.calendario(function (dia) {
        diaSelecionado = dia;
        atualizarAgendamentos();
    });
    calendario.iniciar(hoje);

    var navegacaoMes = window.navegacaoMes(function (mes, ano) {
        calendario.atualizarMes(mes, ano);
    });
    navegacaoMes.iniciar(hoje);

    var modal = window.modal();

    var elAgendamento = {
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
        elAgendamento.data.valueAsNumber = diaSelecionado.getTime();
        modal.abrir();
    }

    function salvarAgendamento() {
        modal.fechar();
    }

    function atualizarAgendamentos() {
        dataSelecionada.innerText = formatoData.format(diaSelecionado);
    }

    document.getElementById("modal-botao-salvar").addEventListener("click", salvarAgendamento);
    document.getElementById("novo-agendamento").addEventListener("click", novoAgendamento);
});