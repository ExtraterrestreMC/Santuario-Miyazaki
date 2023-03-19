/**
 * Mensajes para devolver JSON
 */
exports.noExiste = (valor) => {
    return JSON.parse(` { "codError": "404", "desc": "${valor} no existe" }`);
};
exports.errInterno = (err) => {
    return JSON.parse(` { "codError": "500", "desc": "${err}" }`);
};
exports.wrapAsync = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch(e => {
            next(e)
        });
    }
}