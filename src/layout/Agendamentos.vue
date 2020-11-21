<template>
    <div>
        <div class="container">
            <div class="calendario">
                <CalendarioNav @change="anoMesModificado" />
                <DiasCalendario
                    :mes="mesAtual"
                    :ano="anoAtual"
                    @change="dataModificada"
                />
            </div>

            <div class="agendamentos">
                <CabecalhoAgendamentos
                    :dataAtual="dataAtual"
                    @novo-agendamento="abrirModalNovoAgendamento"
                />

                <div class="agendamentos-itens">
                    <ul>
                        <ItemAgendamento
                            v-for="(agendamento, indice) in agendamentos"
                            :key="indice"
                            :agendamento="agendamento"
                            @click="onAgendamentoSelecionado"
                            @remover="onRemoverAgendamento"
                        />
                    </ul>
                </div>
            </div>
        </div>

        <ModalAgendamento
            :exibir="exibirModal"
            :agendamento="agendamentoSelecionado"
            @fechar="fecharModal"
        />
    </div>
</template>

<style lang="scss" scoped>
.calendario {
    background-color: #ededff;
    height: 100vh;
}

.agendamentos {
    flex: 1 0 auto;

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
}

.container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: 0 auto;
    max-width: 52rem;
}

@media (max-width: 576px) {
    .container {
        width: 100%;
        flex-direction: column;
    }

    .calendario {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .agendamentos {
        width: 100%;
    }
}
</style>

<script>
import CalendarioNav from "../componentes/CalendarioNav.vue";
import DiasCalendario from "../componentes/DiasCalendario.vue";
import ItemAgendamento from "../componentes/ItemAgendamento.vue";
import ModalAgendamento from "./ModalAgendamento.vue";
import CabecalhoAgendamentos from "./CabecalhoAgendamentos.vue";

import {
    obterAgendamentos,
    removerAgendamento,
} from "../servicos/persistencia";
import { novoAgendamento, clonarAgendamento } from "../servicos/agendamento";

export default {
    components: {
        CalendarioNav,
        DiasCalendario,
        ItemAgendamento,
        ModalAgendamento,
        CabecalhoAgendamentos,
    },
    data() {
        return {
            dataAtual: null,
            mesAtual: null,
            anoAtual: null,
            agendamentoSelecionado: null,
            exibirModal: false,
            agendamentos: [],
        };
    },
    methods: {
        anoMesModificado(e) {
            this.mesAtual = e.mes;
            this.anoAtual = e.ano;
        },
        dataModificada(e) {
            this.dataAtual = e.data;
            this.listarAgendamentos();
        },
        listarAgendamentos() {
            this.agendamentos = obterAgendamentos(this.dataAtual);
        },
        abrirModalNovoAgendamento() {
            const novoAg = novoAgendamento(this.dataAtual);
            this._abrirModalAgendamento(novoAg);
        },
        _abrirModalAgendamento(agendamento) {
            this.agendamentoSelecionado = agendamento;
            this.exibirModal = true;
        },
        onAgendamentoSelecionado(agendamento) {
            const clone = clonarAgendamento(agendamento);
            this._abrirModalAgendamento(clone);
        },
        fecharModal(houveModificacao) {
            this.agendamentoSelecionado = null;
            this.exibirModal = false;

            if (houveModificacao) this.listarAgendamentos();
        },
        onRemoverAgendamento(id) {
            removerAgendamento(id);
            this.listarAgendamentos();
        },
    },
};
</script>