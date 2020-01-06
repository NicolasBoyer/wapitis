export abstract class Log {

    /**
     * Log classique avec le message renseigné et les données datas si elles existent
     *
     * @param {string} message Le message à afficher
     * @param {...any[]} datas Les données envoyées et affichées
     */
    static info(message: string, ...datas: any[]) {
        this.emitLogMessage('info', message, datas)
    }

    /**
     * Log de type debug avec le message renseigné et les données datas si elles existent
     *
     * @param {string} message Le message à afficher
     * @param {...any[]} datas Les données envoyées et affichées
     */
    static debug(message: string, ...datas: any[]) {
        if (process.env.NODE_ENV !== 'production') {
            this.emitLogMessage('debug', message, datas)
        }
    }

    /**
     * Log de type warn (marron sur fond jaune) avec le message renseigné et les données datas si elles existent
     *
     * @param {string} message Le message à afficher
     * @param {...any[]} datas Les données envoyées et affichées
     */
    static warn(message: string, ...datas: any[]) {
        this.emitLogMessage('warn', message, datas)
    }

    /**
     * Log de type error (rouge sur fond rose) avec le message renseigné et les données datas si elles existent
     *
     * @param {string} message Le message à afficher
     * @param {...any[]} datas Les données envoyées et affichées
     */
    static error(message: string, ...datas: any[]) {
        this.emitLogMessage('error', message, datas)
    }

    private static emitLogMessage(type: 'debug' | 'warn' | 'info' | 'error', message: string, datas: any[]) {
        if (datas.length > 0) {
            console[type](message, datas)
        } else {
            console[type](message)
        }
    }

}
