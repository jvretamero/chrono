import { gerarId } from "./utils";

const CHAVE_AGENDAMENTOS = "agendamentos";
const storage = window.sessionStorage;
let listaAgendamento = null;

const persistirAgendamentos = function (agendamentos) {
    storage.setItem(CHAVE_AGENDAMENTOS, JSON.stringify(agendamentos));
};

export const obterAgendamentos = function () {
    if (listaAgendamento == null) {
        const agendamentosStr = storage.getItem(CHAVE_AGENDAMENTOS);
        const agendamentos = agendamentosStr ? JSON.parse(agendamentosStr) : [];

        listaAgendamento = {};

        // Ajuste necessário pois as datas foram salvas como JSON
        // ou seja, transformadas em string
        agendamentos.forEach(function (agendamento) {
            agendamento.data = new Date(agendamento.data);

            listaAgendamento[agendamento.id] = agendamento;
        });
    }

    return listaAgendamento;
};

export const persistirAgendamento = function (agendamento) {
    agendamento.id = gerarId();

    const agendamentos = obterAgendamentos();
    agendamentos[agendamento.id] = agendamento;

    persistirAgendamentos(agendamentos);
};