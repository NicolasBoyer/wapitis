export abstract class Log {

    static info(message: string, ...datas: any[]) {
        this.emitLogMessage('info', message, datas)
    }

    static debug(message: string, ...datas: any[]) {
        if (process.env.NODE_ENV !== 'production') {
            this.emitLogMessage('debug', message, datas)
        }
    }

    static warn(message: string, ...datas: any[]) {
        this.emitLogMessage('warn', message, datas)
    }

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
