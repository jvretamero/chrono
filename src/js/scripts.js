var ready = function (fn) {
    if (document.readyState === 'complete')
        return fn();

    document.addEventListener('DOMContentLoaded', fn, false);
};

ready(function () {
    var formatoData = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" });
    var formatoHora = new Intl.DateTimeFormat("pt-BR", { timeStyle: "short" });


    var dataSelecionada = document.getElementById("data-selecionada");
    var listaAgendamentos = document.getElementById("lista-agendamentos");

    var hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    var persistencia = window.persistencia();

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

    function listarAgendamentos() {
        var agendamentos = persistencia.obterAgendamentos();

        for (var agendamento of agendamentos) {
            var li = document.createElement("li");
            li.classList.add("agendamento");

            var divHorario = document.createElement("div");

            var spanHorarioInicio = document.createElement("span");
            spanHorarioInicio.classList.add("horario-inicio");
            spanHorarioInicio.innerText = agendamento.hora.inicial;
            divHorario.append(spanHorarioInicio);

            var spanHorarioFim = document.createElement("span");
            spanHorarioFim.classList.add("horario-fim");
            spanHorarioFim.innerText = agendamento.hora.final;
            divHorario.append(spanHorarioFim);

            li.append(divHorario);

            var divDados = document.createElement("div");

            li.append(divDados);

            listaAgendamentos.append(li);
        }
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

    var agendamentoParaObjeto = function () {
        return {
            data: elAgendamento.data.valueAsNumber,
            hora: {
                inicial: elAgendamento.hora.inicial.value,
                final: elAgendamento.hora.final.value
            },
            assunto: elAgendamento.assunto.value,
            categoria: elAgendamento.categoria.value,
            notas: elAgendamento.notas.value
        };
    };

    function salvarAgendamento(agendamento) {
        persistencia.salvarAgendamento(agendamento);

        modal.fechar();
    }

    function atualizarAgendamentos(dia) {
        dataSelecionada.innerText = formatoData.format(dia);

        listarAgendamentos();
    }

    elAgendamento.form.addEventListener("submit", function (e) {
        e.preventDefault();

        var objAgendamento = agendamentoParaObjeto();
        var validacoes = window.validarAgendamento(objAgendamento);

        if (validacoes.length) {
            return alert("Inválido");
        }

        salvarAgendamento(objAgendamento);
    });

    document.getElementById("novo-agendamento").addEventListener("click", novoAgendamento);
});