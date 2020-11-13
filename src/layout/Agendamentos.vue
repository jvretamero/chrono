<template>
    <div class="container">
        <div class="calendario">
            <CalendarioNav @change="anoMesModificado" />
            <DiasCalendario :mes="mesAtual" :ano="anoAtual" />
        </div>

        <div class="agendamentos">
            <div class="agendamentos-cabecalho">
                <span id="data-selecionada" class="data-selecionada">Data</span>
                <button id="novo-agendamento" type="button" class="botao">
                    +
                </button>
            </div>

            <div class="agendamentos-itens">
                <ul id="lista-agendamentos">
                    <!-- <li class="agendamento">
                        <div class="agendamento-horario">
                            <span class="horario-inicio">08:30</span>
                            <span class="horario-termino">09:30</span>
                        </div>
                        <div class="agendamento-dados">
                            <span class="categoria">Marketing</span>
                            <span class="titulo">Configurar Heroku</span>
                        </div>
                    </li> -->
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import CalendarioNav from "../componentes/CalendarioNav.vue";
import DiasCalendario from "../componentes/DiasCalendario.vue";

export default {
    components: {
        CalendarioNav,
        DiasCalendario,
    },
    data() {
        return {
            mesAtual: null,
            anoAtual: null,
        };
    },
    methods: {
        anoMesModificado(e) {
            this.mesAtual = e.mes;
            this.anoAtual = e.ano;
        },
    },
};
</script>