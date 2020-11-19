<template>
    <div class="agendamentos-cabecalho">
        <span class="data-selecionada">{{ dataFormatada }}</span>
        <button type="button" class="botao novo-agendamento" @click="notificarNovoAgendamento">
            +
        </button>
    </div>
</template>

<script>
import { formatarData } from "../servicos/dataHora";

export default {
    props: ["dataAtual"],
    computed: {
        dataFormatada() {
            return formatarData(this.dataAtual);
        },
    },
    methods: {
        notificarNovoAgendamento() {
            this.$emit("novo-agendamento");
        },
    },
};
</script>