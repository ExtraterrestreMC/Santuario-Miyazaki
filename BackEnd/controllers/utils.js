/**
 * Mensajes para devolver JSON
 */

exports.errInterno = (err) => {
    return JSON.parse(` { "codError": "500", "desc": "${err}" }`);
};