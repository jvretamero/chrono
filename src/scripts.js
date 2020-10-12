document.addEventListener("DOMContentLoaded", function () {
    var formatoData = new Intl.DateTimeFormat("pt-BR");

    var elRaiz = document.documentElement;
    var selectMes = document.getElementById("select-mes");
    var selectAno = document.getElementById("select-ano");
    var diasMes = document.getElementById("dias-mes");
    var dataSelecionada = document.getElementById("data-selecionada");

    var hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    var anoAtual = hoje.getFullYear();
    var mesAtual = hoje.getMonth();
    var meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    var diaSelecionado = hoje;

    function proximoMes() {
        if (mesAtual == 11) {
            anoAtual++;
            mesAtual = 0;
        } else {
            mesAtual++;
        }

        atualizarFiltros();
        atualizarDias();
    }

    function mesAnterior() {
        if (mesAtual == 0) {
            anoAtual--;
            mesAtual = 11;
        } else {
            mesAtual--;
        }

        atualizarFiltros();
        atualizarDias();
    }

    function atualizarFiltros() {
        selectMes.value = mesAtual;
        selectAno.value = anoAtual;
    }

    function gerarMeses(selectMes) {
        for (var indiceMes in meses) {
            var option = document.createElement("option");
            option.value = indiceMes;
            option.innerText = meses[indiceMes];

            if (indiceMes == mesAtual) {
                option.setAttribute("selected", true);
            }

            selectMes.appendChild(option);
        }
    };

    function gerarAnos(selectAno) {
        var anos = [
            anoAtual - 1,
            anoAtual,
            anoAtual + 1
        ];

        for (var ano of anos) {
            var option = document.createElement("option");
            option.value = ano;
            option.innerText = ano;

            if (ano == anoAtual) {
                option.setAttribute("selected", true);
            }

            selectAno.appendChild(option);
        }
    };

    function definirDia(el) {
        if (el.classList.contains("ativo"))
            return;

        var diaAtivo = document.querySelector(".table-mes td.ativo");
        if (diaAtivo)
            diaAtivo.classList.remove("ativo");

        el.classList.add("ativo");

        diaSelecionado = new Date(el.dataset.data);

        atualizarAgendamentos();
    }

    function criarTrDia(ano, mes, dia) {
        var td = document.createElement("td");

        if (ano != null && mes != null && dia != null) {
            td.innerText = dia;
            td.dataset.dia = dia;
            td.dataset.data = new Date(ano, mes, dia);
            td.classList.add("com-dia");
            td.addEventListener("click", function (e) {
                definirDia(this,);
            });
        }

        return td;
    }

    function atualizarDias() {
        diasMes.innerHTML = "";

        var totalDias = new Date(anoAtual, mesAtual + 1, 0).getDate();
        var dia = 1;
        var primeiroDia = new Date(anoAtual, mesAtual);
        var didSemanaInicial = primeiroDia.getDay();

        for (var semana = 0; semana < 6; semana++) {
            var semanaTr = document.createElement("tr");

            for (var diaSemana = 0; diaSemana < 7; diaSemana++) {
                var naoComecouMes = semana == 0 && diaSemana < didSemanaInicial;
                var terminouMes = dia > totalDias;

                if (naoComecouMes || terminouMes) {
                    semanaTr.appendChild(criarTrDia());
                } else {
                    semanaTr.appendChild(criarTrDia(anoAtual, mesAtual, dia));
                    dia++;
                }
            }

            diasMes.appendChild(semanaTr);
        }

        if (diaSelecionado.getMonth() == mesAtual && diaSelecionado.getFullYear() == anoAtual) {
            var tdDia = document.querySelector(`.table-mes td[data-dia="${diaSelecionado.getDate()}"]`);
            if (tdDia) definirDia(tdDia);
        }
    };

    gerarAnos(selectAno);
    gerarMeses(selectMes);

    selectMes.addEventListener("change", function () {
        mesAtual = selectMes.value;
        atualizarDias();
    });

    selectAno.addEventListener("change", function () {
        anoAtual = selectAno.value;
        atualizarDias();
    });

    atualizarDias();

    document.getElementById("btn-proximo-mes").addEventListener("click", proximoMes);
    document.getElementById("btn-mes-anterior").addEventListener("click", mesAnterior);

    var modalAgendamento = document.getElementById("modal-agendamento");

    var elAgendamento = {
        data: document.getElementById("ag-data"),
        hora: {
            inicial: document.getElementById("ag-hora-inicial"),
            final: document.getElementById("ag-hora-final")
        },
        assunto: document.getElementById("ag-assunto"),
        categoria: document.getElementById("ag-categoria"),
        notas: document.getElementById("ag-notas")
    };

    document.getElementById("modal-botao-fechar").addEventListener("click", fecharModal);
    document.getElementById("modal-fundo").addEventListener("click", fecharModal);
    document.getElementById("modal-botao-salvar").addEventListener("click", salvarAgendamento);
    document.getElementById("novo-agendamento").addEventListener("click", novoAgendamento);

    function novoAgendamento() {
        elAgendamento.data.valueAsNumber = diaSelecionado.getTime();
        abrirModal();
    }

    function salvarAgendamento() {
        fecharModal();
    }

    function abrirModal() {
        elRaiz.classList.add("sem-scroll");
        modalAgendamento.classList.add("modal-ativo");
    }

    function fecharModal() {
        modalAgendamento.classList.remove("modal-ativo");
        elRaiz.classList.remove("sem-scroll");
    }

    function atualizarAgendamentos() {
        dataSelecionada.innerText = formatoData.format(diaSelecionado);
    }
});