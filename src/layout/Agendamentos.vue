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

<script>
import CalendarioNav from "../componentes/CalendarioNav.vue";
import DiasCalendario from "../componentes/DiasCalendario.vue";
import ItemAgendamento from "../componentes/ItemAgendamento.vue";
import ModalAgendamento from "./ModalAgendamento.vue";
import CabecalhoAgendamentos from "./CabecalhoAgendamentos.vue";

import { obterAgendamentos } from "../servicos/persistencia";
import { novoAgendamento } from "../servicos/agendamento";

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
            this.agendamentos = obterAgendamentos();
        },
        abrirModalNovoAgendamento() {
            this.agendamentoSelecionado = novoAgendamento(this.dataAtual);
            this.exibirModal = true;
        },
        fecharModal() {
            this.agendamentoSelecionado = null;
            this.exibirModal = false;
        },
    },
};
</script>