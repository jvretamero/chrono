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

        <select
            id="select-ano"
            class="select"
            v-model="anoSelecionado"
            @change="notificar()"
        >
            <option v-for="(ano, indice) in anos" :key="indice" :value="ano">
                {{ ano }}
            </option>
        </select>

        <button id="btn-mes-anterior" type="button" class="botao">&lt;</button>
        <button id="btn-proximo-mes" type="button" class="botao">&gt;</button>
    </div>
</template>

<script>
import { obterMeses } from "../servicos/mes";
import { obterAnos, obterAnoAtual } from "../servicos/ano";

export default {
    data() {
        return {
            mesSelecionado: 0,
            anoSelecionado: obterAnoAtual(),
        };
    },
    computed: {
        meses() {
            return obterMeses();
        },
        anos() {
            return obterAnos();
        },
    },
    methods: {
        notificar() {
            let args = {
                mes: this.mesSelecionado,
                ano: this.anoSelecionado,
            };

            this.$emit("change", args);
        },
    },
};
</script>