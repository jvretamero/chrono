window.calendario = function (callback) {

    var diasMes = document.getElementById("dias-mes");
    var diaSelecionado = null;

    var obetDiaSelecionado = function () {
        return diaSelecionado;
    };

    var definirDia = function (el) {
        if (el.classList.contains("ativo"))
            return;

        var diaAtivo = document.querySelector(".table-mes td.ativo");
        if (diaAtivo)
            diaAtivo.classList.remove("ativo");

        el.classList.add("ativo");

        diaSelecionado = new Date(el.dataset.data);

        if (callback)
            callback(diaSelecionado);
    }

    var criarTrDia = function (ano, mes, dia) {
        var td = document.createElement("td");

        if (ano != null && mes != null && dia != null) {
            td.innerText = dia;
            td.dataset.dia = dia;
            td.dataset.data = new Date(ano, mes, dia);
            td.classList.add("com-dia");
            td.addEventListener("click", function () {
                definirDia(this);
            });
        }

        return td;
    };

    var atualizarMes = function (mes, ano) {
        diasMes.innerHTML = "";

        var totalDias = new Date(ano, mes + 1, 0).getDate();
        var dia = 1;
        var primeiroDia = new Date(ano, mes);
        var didSemanaInicial = primeiroDia.getDay();

        for (var semana = 0; semana < 6; semana++) {
            var semanaTr = document.createElement("tr");

            for (var diaSemana = 0; diaSemana < 7; diaSemana++) {
                var naoComecouMes = semana == 0 && diaSemana < didSemanaInicial;
                var terminouMes = dia > totalDias;

                if (naoComecouMes || terminouMes) {
                    semanaTr.appendChild(criarTrDia());
                } else {
                    semanaTr.appendChild(criarTrDia(ano, mes, dia));
                    dia++;
                }
            }

            diasMes.appendChild(semanaTr);
        }

        if (diaSelecionado.getMonth() == mes && diaSelecionado.getFullYear() == ano) {
            var tdDia = document.querySelector(`.table-mes td[data-dia="${diaSelecionado.getDate()}"]`);
            if (tdDia) definirDia(tdDia);
        }
    };

    var iniciar = function (dia) {
        diaSelecionado = dia;

        atualizarMes(dia.getMonth(), dia.getFullYear());
    };

    return {
        iniciar: iniciar,
        atualizarMes: atualizarMes,
        obetDiaSelecionado: obetDiaSelecionado
    };
};