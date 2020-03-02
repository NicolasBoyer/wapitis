/* eslint-disable no-console */
export abstract class Log {
    /**
     * Si false, aucun log n'est publié à l'exception du log error. True par défaut
     */
    static showLog = true

    /**
     * Si false, les logs de type info ne sont pas publiés. True par défaut
     */
    static showInfoLog = true

    /**
     * Si false, les logs de type debug ne sont pas publiés. True par défaut
     */
    static showDebugLog = true

    /**
     * Si false, les logs de type warning ne sont pas publiés. True par défaut
     */
    static showWarnLog = true

    /**
     * Log classique avec le message renseigné et les données datas si elles existent
     *
     * @param {string} message Le message à afficher
     * @param {...any[]} datas Les données envoyées et affichées
     */
    static info(message: string, ...datas: any[]): void {
        if (this.showLog && this.showInfoLog) {
            this._emitLogMessage('info', message, datas)
        }
    }

    /**
     * Log de type debug avec le message renseigné et les données datas si elles existent. Non publié en production
     *
     * @param {string} message Le message à afficher
     * @param {...any[]} datas Les données envoyées et affichées
     */
    static debug(message: string, ...datas: any[]): void {
        if (process.env.NODE_ENV !== 'production' && this.showLog && this.showDebugLog) {
            this._emitLogMessage('debug', message, datas)
        }
    }

    /**
     * Log de type warn (marron sur fond jaune) avec le message renseigné et les données datas si elles existent
     *
     * @param {string} message Le message à afficher
     * @param {...any[]} datas Les données envoyées et affichées
     */
    static warn(message: string, ...datas: any[]): void {
        if (this.showLog && this.showWarnLog) {
            this._emitLogMessage('warn', message, datas)
        }
    }

    /**
     * Log de type error (rouge sur fond rose) avec le message renseigné et les données datas si elles existent
     *
     * @param {string} message Le message à afficher
     * @param {...any[]} datas Les données envoyées et affichées
     */
    static error(message: string, ...datas: any[]): void {
        this._emitLogMessage('error', message, datas)
    }

    private static _emitLogMessage(type: 'debug' | 'warn' | 'info' | 'error', message: string, datas: any[]): void {
        if (datas.length > 0) {
            console[type](message, datas)
        } else {
            console[type](message)
        }
    }
}
