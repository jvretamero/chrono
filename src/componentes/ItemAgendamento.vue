<template>
    <li class="agendamento" @click="notificarAgendamentoSelecionado">
        <div class="agendamento-horario">
            <span class="horario-inicio">{{ agendamento.hora.inicial }}</span>
            <span class="horario-termino">{{ agendamento.hora.final }}</span>
        </div>
        <div class="agendamento-dados">
            <span class="categoria">{{ agendamento.categoria }}</span>
            <span class="titulo">{{ agendamento.assunto }}</span>
        </div>
    </li>
</template>

<script>
export default {
    props: ["agendamento"],
    methods: {
        notificarAgendamentoSelecionado() {
            this.$emit("click", this.agendamento);
        },
    },
};
</script>