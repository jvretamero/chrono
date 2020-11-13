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
                    :class="{ 'com-dia': !!dia.data }"
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
    computed: {
        semanasDias() {
            return calcularDias(this.mes, this.ano);
        },
    },
    mounted() {
        console.log(this.semanasDias);
    },
};
</script>