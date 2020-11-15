const elRaiz = document.documentElement;

export const desabilitarScroll = function () {
    elRaiz.classList.add("sem-scroll");
};

export const habilitarScroll = function () {
    elRaiz.classList.remove("sem-scroll");
};