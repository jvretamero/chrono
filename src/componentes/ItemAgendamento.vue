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

<style scoped>
.agendamento {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 1rem;
}

.agendamento:hover {
    cursor: pointer;
    background-color: #E1E1F2;
}

.agendamento-horario,
.agendamento-dados {
    display: flex;
    flex-direction: column;
}

.agendamento-dados {
    margin-left: 2rem;
}

.agendamento-horario .horario-inicio {
    font-size: 1.3rem;
    font-weight: 600;
}

.agendamento-horario .horario-termino,
.agendamento-dados .categoria {
    color: #666;
}

.agendamento-dados .titulo {
    font-size: 1.3rem;
}
</style>

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