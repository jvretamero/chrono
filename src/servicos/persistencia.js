import { ajustarData } from "./agendamento";
import { gerarId } from "./utils";
import { datasIguais } from "./dataHora";

const CHAVE_AGENDAMENTOS = "agendamentos";
const storage = window.sessionStorage;
let listaAgendamento = null;

const persistirAgendamentos = function () {
    storage.setItem(CHAVE_AGENDAMENTOS, JSON.stringify(listaAgendamento));
};

export const removerAgendamento = function (id) {
    if (listaAgendamento[id]) {
        delete listaAgendamento[id];

        persistirAgendamentos();
    }
};

export const obterAgendamentos = function (data) {
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

    const agendamentosRetorno = {};

    if (data) {
        for (let id in listaAgendamento) {
            const agendamento = listaAgendamento[id];

            if (datasIguais(data, agendamento.data))
                agendamentosRetorno[id] = agendamento;
        }
    }

    return agendamentosRetorno;
};

export const persistirAgendamento = function (agendamento) {
    if (!agendamento.id)
        agendamento.id = gerarId();

    listaAgendamento[agendamento.id] = agendamento;

    persistirAgendamentos();
};