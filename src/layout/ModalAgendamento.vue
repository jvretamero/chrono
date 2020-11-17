<template>
    <div :class="{ modal: 1, 'modal-ativo': exibir }" v-if="exibir">
        <div class="modal-fundo" @click="notificarFechar"></div>
        <div class="modal-conteudo">
            <form>
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

<script>
import { formatarDataParaInput, inputParaData } from "../servicos/dataHora";
import { habilitarScroll, desabilitarScroll } from "../servicos/modal";

export default {
    props: ["exibir", "agendamento"],
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
            if (novoExibir) desabilitarScroll();
            else habilitarScroll();
        },
    },
    methods: {
        notificarFechar() {
            this.$emit("fechar");
        },
    },
};
</script>