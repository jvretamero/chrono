<template>
    <table class="table-mes">
        <thead>
            <th>Dom</th>
            <th>Seg</th>
            <th>Ter</th>
            <th>Qua</th>
            <th>Qui</th>
            <th>Sex</th>
            <th>Sab</th>
        </thead>

        <tbody id="dias-mes">
            <tr v-for="(semana, idxSemana) in semanasDias" :key="idxSemana">
                <td
                    v-for="(dia, idxDia) in semana"
                    :key="idxDia"
                    :class="{
                        'com-dia': !!dia.data,
                        ativo: isDiaSelecionado(dia.data),
                    }"
                    @click="selecionarDia(dia)"
                >
                    {{ dia.numero }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { calcularDias } from "../servicos/calendario";

export default {
    props: {
        mes: Number,
        ano: Number,
    },
    data() {
        let hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        return {
            dataSelecionada: hoje,
        };
    },
    computed: {
        semanasDias() {
            return calcularDias(this.mes, this.ano);
        },
    },
    methods: {
        selecionarDia(dia) {
            this.dataSelecionada = dia.data;
            this.notificar();
        },
        isDiaSelecionado(dataDia) {
            if (!dataDia || !this.dataSelecionada) return false;
            return dataDia.getTime() == this.dataSelecionada.getTime();
        },
        notificar() {
            this.$emit("change", { data: this.dataSelecionada });
        },
    },
    mounted() {
        this.notificar();
    },
};
</script>