const morgan = require("morgan")
const fs = require("fs")

/**
 * Añadir fecha a los logs
 */
const anyadirMorgan = morgan('combined', {
    stream: fs.createWriteStream('./Logs/archivosLogs/acceso/access.log', { flags: 'a' })
})

module.exports = anyadirMorgan;