<template>
    <div class="agendamentos-cabecalho">
        <span class="data-selecionada">{{ dataFormatada }}</span>
        <button
            type="button"
            class="botao novo-agendamento"
            @click="notificarNovoAgendamento"
        >
            +
        </button>
    </div>
</template>

<style scoped>
.agendamentos-cabecalho {
    padding: 1rem;
}

.data-selecionada {
    margin-right: 1rem;
    font-size: 1.7rem;
    font-weight: 600;
    vertical-align: middle;
}

.novo-agendamento {
    background-color: #785199;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    color: #fff;
}

.novo-agendamento:hover {
    background-color: #B57AE6;
}
</style>

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