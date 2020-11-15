<template>
    <div :class="{ modal: 1, 'modal-ativo': exibir }" v-if="exibir">
        <div class="modal-fundo" @click="notificarFechar"></div>
        <div class="modal-conteudo">
            <form id="ag-form">
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
                        id="ag-data"
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
                            id="ag-hora-inicial"
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
                            id="ag-hora-final"
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
                        class="input"
                        id="ag-assunto"
                        type="text"
                        name="assunto"
                        required
                    />
                </div>

                <div class="campo-entrada">
                    <label class="label" for="ag-categoria">Categoria</label>
                    <select id="ag-categoria" class="select-entrada" required>
                        <option>Marketing</option>
                        <option>Recursos Humanos</option>
                        <option>Tecnologia</option>
                    </select>
                </div>

                <div class="campo-entrada">
                    <label class="label" for="ag-notas">Notas</label>
                    <textarea
                        class="textarea"
                        id="ag-notas"
                        name="notas"
                    ></textarea>
                </div>

                <div class="modal-rodape">
                    <button
                        id="modal-botao-salvar"
                        class="botao modal-botao-salvar"
                        type="submit"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { habilitarScroll, desabilitarScroll } from "../servicos/modal";

export default {
    props: ["exibir", "agendamento"],
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