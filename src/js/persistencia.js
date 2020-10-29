window.persistencia = function () {
    var chaveAgendamentos = "agendamentos";
    var storage = window.sessionStorage;

    var gerarId = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    var obterAgendamentos = function () {
        var agendamentosStr = storage.getItem(chaveAgendamentos);
        return agendamentosStr ? JSON.parse(agendamentosStr) : [];
    };

    var salvarAgendamentos = function (agendamentos) {
        storage.setItem(chaveAgendamentos, JSON.stringify(agendamentos));
    };

    var salvarAgendamento = function (agendamento) {
        agendamento.id = gerarId();

        var agendamentos = obterAgendamentos();
        agendamentos.push(agendamento);

        salvarAgendamentos(agendamentos);
    };

    return {
        obterAgendamentos: obterAgendamentos,
        salvarAgendamento: salvarAgendamento
    };
};