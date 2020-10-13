document.addEventListener("DOMContentLoaded", function () {
    var formatoData = new Intl.DateTimeFormat("pt-BR");

    var elRaiz = document.documentElement;
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

    var modalAgendamento = document.getElementById("modal-agendamento");

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

    document.getElementById("modal-botao-fechar").addEventListener("click", fecharModal);
    document.getElementById("modal-fundo").addEventListener("click", fecharModal);
    document.getElementById("modal-botao-salvar").addEventListener("click", salvarAgendamento);
    document.getElementById("novo-agendamento").addEventListener("click", novoAgendamento);

    function novoAgendamento() {
        elAgendamento.data.valueAsNumber = diaSelecionado.getTime();
        abrirModal();
    }

    function salvarAgendamento() {
        fecharModal();
    }

    function abrirModal() {
        elRaiz.classList.add("sem-scroll");
        modalAgendamento.classList.add("modal-ativo");
    }

    function fecharModal() {
        modalAgendamento.classList.remove("modal-ativo");
        elRaiz.classList.remove("sem-scroll");
    }

    function atualizarAgendamentos() {
        dataSelecionada.innerText = formatoData.format(diaSelecionado);
    }
});