import { ajustarData } from "./agendamento";
import { gerarId } from "./utils";

const CHAVE_AGENDAMENTOS = "agendamentos";
const storage = window.sessionStorage;
let listaAgendamento = null;

const persistirAgendamentos = function () {
    storage.setItem(CHAVE_AGENDAMENTOS, JSON.stringify(listaAgendamento));
};

export const obterAgendamentos = function () {
    if (listaAgendamento == null) {
        const agendamentosStr = storage.getItem(CHAVE_AGENDAMENTOS);
        const agendamentos = agendamentosStr ? JSON.parse(agendamentosStr) : {};

        listaAgendamento = {};

        for (let id in agendamentos) {
            const agendamento = agendamentos[id];
            ajustarData(agendamento);

            listaAgendamento[id] = agendamento;
        }
    }

    return listaAgendamento;
};

export const persistirAgendamento = function (agendamento) {
    if (!agendamento.id)
        agendamento.id = gerarId();

    listaAgendamento[agendamento.id] = agendamento;

    persistirAgendamentos();
};