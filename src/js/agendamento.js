(function () {
    var regexHora = new RegExp("^(0[0-9]|1[0-9]|2[0-3])\:[0-5][0-9]$");

    window.validarAgendamento = function (obj) {
        var validacoes = [];

        if (!obj.data)
            validacoes.push("Informe a data correta");

        if (!obj.hora.inicial || !regexHora.test(obj.hora.inicial))
            validacoes.push("Informe o horário incial correto");

        if (!obj.hora.final || !regexHora.test(obj.hora.final))
            validacoes.push("Informe o horário final correto");

        if (!obj.assunto || obj.assunto.trim() == "")
            validacoes.push("Informe o assunto");

        return validacoes;
    };
})();