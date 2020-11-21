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
        <div class="agendamento-acoes">
            <button type="button" class="botao" @click.stop="notificarRemocao">
                Remover
            </button>
        </div>
    </li>
</template>

<style lang="scss" scoped>
.agendamento {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;

    &:hover {
        cursor: pointer;
        background-color: #e1e1f2;
    }
}

.agendamento-horario,
.agendamento-dados {
    display: flex;
    flex-direction: column;
}

.agendamento-dados {
    margin-left: 2rem;
    flex: 1;

    .titulo {
        font-size: 1.3rem;
    }
}

.agendamento-horario .horario-inicio {
    font-size: 1.3rem;
    font-weight: 600;
}

.agendamento-horario .horario-termino,
.agendamento-dados .categoria {
    color: #666;
}

.agendamento-acoes .botao {
    padding: 0.5rem;
    border: 1px solid #654480;
    color: #654480;
    border-radius: 0.5rem;

    &:hover {
        background-color: #fff;
    }
}
</style>

<script>
export default {
    props: ["agendamento"],
    methods: {
        notificarAgendamentoSelecionado() {
            this.$emit("click", this.agendamento);
        },
        notificarRemocao() {
            this.$emit("remover", this.agendamento.id);
        },
    },
};
</script>