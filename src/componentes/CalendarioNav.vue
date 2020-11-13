<template>
    <div class="calendario-nav">
        <select class="select" v-model="mesSelecionado" @change="notificar()">
            <option
                v-for="(mes, indice) in meses"
                :key="indice"
                :value="indice"
            >
                {{ mes }}
            </option>
        </select>

        <select class="select" v-model="anoSelecionado" @change="notificar()">
            <option v-for="(ano, indice) in anos" :key="indice" :value="ano">
                {{ ano }}
            </option>
        </select>

        <button type="button" class="botao" @click="mesAnterior">&lt;</button>
        <button type="button" class="botao" @click="proximoMes">&gt;</button>
    </div>
</template>

<script>
import {
    mesAtual,
    anoAtual,
    obterMeses,
    obterAnos,
    calcularProximoMes,
    calcularMesAnterior,
} from "../servicos/calendario";

export default {
    data() {
        return {
            mesSelecionado: mesAtual(),
            anoSelecionado: anoAtual(),
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
        proximoMes() {
            let { mes, ano } = calcularProximoMes(
                this.mesSelecionado,
                this.anoSelecionado
            );

            this.mesSelecionado = mes;
            this.anoSelecionado = ano;
        },
        mesAnterior() {
            let { mes, ano } = calcularMesAnterior(
                this.mesSelecionado,
                this.anoSelecionado
            );

            this.mesSelecionado = mes;
            this.anoSelecionado = ano;
        },
    },
};
</script>