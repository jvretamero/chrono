import "../css/estilos.css";

import { ready } from "./utils";
import { validarAgendamento } from "./agendamento";
import criarPersistencia from "./persistencia";
import criarModal from "./modal";
import criarNavegacaoMes from "./navegacao-mes";
import criarCalendario from "./calendario";

ready(function () {
    var formatoData = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" });
    var formatoHora = new Intl.DateTimeFormat("pt-BR", { timeStyle: "short" });

    var dataSelecionada = document.getElementById("data-selecionada");
    var listaAgendamentos = document.getElementById("lista-agendamentos");

    var hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    var persistencia = criarPersistencia();

    var calendario = criarCalendario(atualizarAgendamentos);
    calendario.iniciar(hoje);

    var navegacaoMes = criarNavegacaoMes(calendario.atualizarMes);
    navegacaoMes.iniciar(hoje);

    var modal = criarModal();

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

    function criarElementoAgendamento(agendamento) {
        var li = document.createElement("li");
        li.classList.add("agendamento");

        var divHorario = document.createElement("div");
        divHorario.classList.add("agendamento-horario");

        var spanHorarioInicio = document.createElement("span");
        spanHorarioInicio.classList.add("horario-inicio");
        spanHorarioInicio.innerText = agendamento.hora.inicial;
        divHorario.append(spanHorarioInicio);

        var spanHorarioFim = document.createElement("span");
        spanHorarioFim.classList.add("horario-termino");
        spanHorarioFim.innerText = agendamento.hora.final;
        divHorario.append(spanHorarioFim);

        li.append(divHorario);

        var divDados = document.createElement("div");
        divDados.classList.add("agendamento-dados");

        var spanCategoria = document.createElement("span");
        spanCategoria.classList.add("categoria");
        spanCategoria.innerText = agendamento.categoria;
        divDados.append(spanCategoria);

        var spanAssunto = document.createElement("span");
        spanAssunto.classList.add("titulo");
        spanAssunto.innerText = agendamento.assunto;
        divDados.append(spanAssunto);

        li.append(divDados);

        return li;
    }

    function listarAgendamentos() {
        var agendamentos = persistencia.obterAgendamentos();

        for (var agendamento of agendamentos) {
            var li = criarElementoAgendamento(agendamento);
            listaAgendamentos.append(li);
        }
    }

    function novoAgendamento() {
        var horaInicial = new Date();
        var horaFinal = new Date(horaInicial.getTime() + (60 * 60 * 1000));

        elAgendamento.data.valueAsNumber = calendario.obterDiaSelecionado().getTime();
        elAgendamento.hora.inicial.value = formatoHora.format(horaInicial);
        elAgendamento.hora.final.value = formatoHora.format(horaFinal);

        modal.abrir();

        elAgendamento.assunto.focus();
    }

    function agendamentoParaObjeto() {
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
    }

    function salvarAgendamento(agendamento) {
        persistencia.persistirAgendamento(agendamento);

        modal.fechar();
    }

    function atualizarAgendamentos(dia) {
        dataSelecionada.innerText = formatoData.format(dia);

        listarAgendamentos();
    }

    elAgendamento.form.addEventListener("submit", function (e) {
        e.preventDefault();

        var objAgendamento = agendamentoParaObjeto();
        var validacoes = validarAgendamento(objAgendamento);

        if (validacoes.length) {
            return alert("Inválido");
        }

        salvarAgendamento(objAgendamento);

        elAgendamento.form.reset();

        listarAgendamentos();
    });

    document.getElementById("novo-agendamento").addEventListener("click", novoAgendamento);
});