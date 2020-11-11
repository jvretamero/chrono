export const gerarId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const ready = function (fn) {
    if (document.readyState === 'complete')
        return fn();

    document.addEventListener('DOMContentLoaded', fn, false);
};