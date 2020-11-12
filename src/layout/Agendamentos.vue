<template>
    <div class="container">
        <div class="calendario">
            <CalendarioNav @change="anoMesModificado" />

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

                <tbody id="dias-mes"></tbody>
            </table>
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

export default {
    components: {
        CalendarioNav,
    },
    methods: {
        anoMesModificado(e) {
            console.log(e);
        },
    },
};
</script>