document.addEventListener("DOMContentLoaded", function () {
    var formatoData = new Intl.DateTimeFormat("pt-BR");

    var elRaiz = document.documentElement;
    var diasMes = document.getElementById("dias-mes");
    var dataSelecionada = document.getElementById("data-selecionada");

    var hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    var diaSelecionado = hoje;

    var navegacaoMes = window.navegacaoMes(function () {
        atualizarDias();
    });
    navegacaoMes.iniciar(hoje);

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
        var mesAtual = navegacaoMes.obterMes();
        var anoAtual = navegacaoMes.obterAno();

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

    atualizarDias();

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