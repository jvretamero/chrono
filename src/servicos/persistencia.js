import { gerarId } from "./utils";

const CHAVE_AGENDAMENTOS = "agendamentos";
const storage = window.sessionStorage;

const persistirAgendamentos = function (agendamentos) {
    storage.setItem(CHAVE_AGENDAMENTOS, JSON.stringify(agendamentos));
};

export const obterAgendamentos = function () {
    var agendamentosStr = storage.getItem(CHAVE_AGENDAMENTOS);
    return agendamentosStr ? JSON.parse(agendamentosStr) : [];
};

export const persistirAgendamento = function (agendamento) {
    agendamento.id = gerarId();

    var agendamentos = obterAgendamentos();
    agendamentos.push(agendamento);

    persistirAgendamentos(agendamentos);
};