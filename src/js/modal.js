export default function () {
    var elRaiz = document.documentElement;
    var modalAgendamento = document.getElementById("modal-agendamento");

    var abrirModal = function () {
        elRaiz.classList.add("sem-scroll");
        modalAgendamento.classList.add("modal-ativo");
    };

    var fecharModal = function () {
        modalAgendamento.classList.remove("modal-ativo");
        elRaiz.classList.remove("sem-scroll");
    };

    document.getElementById("modal-botao-fechar").addEventListener("click", fecharModal);
    document.getElementById("modal-fundo").addEventListener("click", fecharModal);

    return {
        abrir: abrirModal,
        fechar: fecharModal
    };
};