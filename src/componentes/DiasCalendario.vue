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

        <tbody>
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

<style lang="scss" scoped>
.table-mes {
    table-layout: fixed;
    padding: 1rem;
    border-collapse: collapse;
    margin: 0 1rem 0 1rem;
    color: #462f59;

    thead {
        color: #654480;
        border-bottom: 1px solid #654480;
    }

    td,
    th {
        width: 3rem;
        height: 3rem;
        padding: 0;
        text-align: center;
    }

    th {
        padding-bottom: 0.3rem;
    }

    tbody tr:hover {
        background-color: #e1e1f2;
    }

    td.com-dia:hover {
        background-color: #ccba6c;
        cursor: pointer;
        border-radius: 50%;
    }

    td.ativo {
        background-color: #f2d58d;
        border-radius: 50%;

        &:hover {
            background-color: #ccba6c;
        }
    }
}
</style>

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