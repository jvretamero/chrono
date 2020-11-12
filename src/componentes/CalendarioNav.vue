<template>
    <div class="calendario-nav">
        <select
            id="select-mes"
            class="select"
            v-model="mesSelecionado"
            @change="notificar()"
        >
            <option
                v-for="(mes, indice) in meses"
                :key="indice"
                :value="indice"
            >
                {{ mes }}
            </option>
        </select>
        <select id="select-ano" class="select"></select>

        <button id="btn-mes-anterior" type="button" class="botao">&lt;</button>
        <button id="btn-proximo-mes" type="button" class="botao">&gt;</button>
    </div>
</template>

<script>
import { obterMeses } from "../servicos/mes";

export default {
    data() {
        return {
            mesSelecionado: 0,
        };
    },
    computed: {
        meses() {
            return obterMeses();
        },
    },
    methods: {
        notificar() {
            let args = {
                mes: this.mesSelecionado,
            };

            this.$emit("change", args);
        },
    },
};
</script>