<template>
    <div :class="{ modal: 1, 'modal-ativo': exibir }" v-if="exibir">
        <div class="modal-fundo" @click="notificarFechar()"></div>
        <div class="modal-conteudo">
            <form @submit.prevent="salvarAgendamento">
                <div class="modal-cabecalho">
                    <span class="modal-titulo">Agendamento</span>
                    <button
                        class="botao modal-botao-fechar"
                        @click="notificarFechar"
                    >
                        Fechar
                    </button>
                </div>

                <div class="campo-entrada">
                    <label class="label" for="ag-data">Data</label>
                    <input
                        class="input"
                        v-model="data"
                        type="date"
                        name="data"
                        required
                    />
                </div>

                <div class="campo-entrada campo-entrada-grupo">
                    <div class="campo-entrada">
                        <label class="label" for="ag-hora-inicial"
                            >Hora inicial</label
                        >
                        <input
                            class="input"
                            v-model="agendamento.hora.inicial"
                            type="text"
                            pattern="(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]"
                            name="hora-inicial"
                            required
                        />
                    </div>

                    <div class="campo-entrada">
                        <label class="label" for="ag-hora-final"
                            >Hora final</label
                        >
                        <input
                            class="input"
                            v-model="agendamento.hora.final"
                            type="text"
                            pattern="(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]"
                            name="hora-final"
                            required
                        />
                    </div>
                </div>

                <div class="campo-entrada">
                    <label class="label" for="ag-assunto">Assunto</label>
                    <input
                        v-model="agendamento.assunto"
                        class="input"
                        type="text"
                        ref="assunto"
                        name="assunto"
                        required
                    />
                </div>

                <div class="campo-entrada">
                    <label class="label" for="ag-categoria">Categoria</label>
                    <select
                        class="select-entrada"
                        required
                        v-model="agendamento.categoria"
                    >
                        <option>Marketing</option>
                        <option>Recursos Humanos</option>
                        <option>Tecnologia</option>
                    </select>
                </div>

                <div class="campo-entrada">
                    <label class="label" for="ag-notas">Notas</label>
                    <textarea
                        v-model="agendamento.notas"
                        class="textarea"
                        name="notas"
                    ></textarea>
                </div>

                <div class="modal-rodape">
                    <button class="botao modal-botao-salvar" type="submit">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.modal {
    display: none;
    position: fixed;
    z-index: 50;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.modal.modal-ativo {
    display: flex;
}

.modal-fundo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.6);
}

.modal-conteudo {
    position: relative;
    background-color: #fff;
    width: 35rem;
    padding: 1.25rem;
    border-radius: 0.5rem;
    overflow: auto;
    margin: 0 auto;
    max-height: calc(100vh - 2rem);
}

.modal-cabecalho {
    padding-bottom: 1rem;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

.modal-titulo {
    margin: 0;
    flex: 1;
    font-size: 1.5rem;
    font-weight: 600;
}

.modal-botao-fechar {
    font-weight: 400;
    background-color: #f5f5f5;
    padding: 0.5rem;
    border-radius: 0.25rem;
}

.modal-botao-fechar:hover {
    background-color: #eee;
}

.modal-rodape {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 2rem;
}

.modal-botao-salvar {
    font-weight: 400;
    color: #fff;
    background-color: #5691b5;
    padding: 0.5rem;
    border-radius: 0.25rem;
}

.modal-botao-salvar:hover {
    background-color: #457b9d;
}

.label {
    display: block;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.campo-entrada {
    line-height: 1.5;
    margin-bottom: 1rem;
}

.campo-entrada .campo-entrada {
    margin-bottom: 0;
}

.campo-entrada .campo-entrada:not(:first-child) {
    margin-left: 1rem;
}

.campo-entrada-grupo {
    display: flex;
    justify-content: flex-start;
}
</style>

<script>
import { formatarDataParaInput, inputParaData } from "../servicos/dataHora";
import { habilitarScroll, desabilitarScroll } from "../servicos/modal";
import { validarAgendamento } from "../servicos/agendamento";
import { persistirAgendamento } from "../servicos/persistencia";

export default {
    props: ["exibir", "agendamento"],
    data() {
        return {
            erros: [],
        };
    },
    computed: {
        data: {
            get() {
                return formatarDataParaInput(this.agendamento.data);
            },
            set(value) {
                this.agendamento.data = inputParaData(value);
            },
        },
    },
    watch: {
        exibir(novoExibir) {
            if (novoExibir) {
                desabilitarScroll();
                this.$nextTick(function () {
                    this.$refs.assunto.focus();
                });
            } else {
                habilitarScroll();
            }
        },
    },
    methods: {
        notificarFechar(houveModificacao) {
            this.$emit("fechar", houveModificacao || false);
        },
        salvarAgendamento() {
            this.erros = validarAgendamento(this.agendamento);

            if (this.erros.length > 0) {
                return alert("Inválido"); //TODO melhorar exibição de erros
            }

            persistirAgendamento(this.agendamento);
            this.notificarFechar(true);
        },
    },
};
</script>