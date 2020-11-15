<template>
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
            <div class="agendamentos-cabecalho">
                <span class="data-selecionada">{{ dataFormatada }}</span>
                <button type="button" class="botao">+</button>
            </div>

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
</template>

<script>
import CalendarioNav from "../componentes/CalendarioNav.vue";
import DiasCalendario from "../componentes/DiasCalendario.vue";
import ItemAgendamento from "../componentes/ItemAgendamento.vue";
import { obterAgendamentos } from "../servicos/persistencia";
import { formatarData } from "../servicos/utils";

export default {
    components: {
        CalendarioNav,
        DiasCalendario,
        ItemAgendamento,
    },
    data() {
        return {
            dataAtual: null,
            mesAtual: null,
            anoAtual: null,
            agendamentos: [],
        };
    },
    computed: {
        dataFormatada() {
            return formatarData(this.dataAtual);
        },
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
    },
};
</script>