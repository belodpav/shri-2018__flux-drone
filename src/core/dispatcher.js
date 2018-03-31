/**
 * Представляет dispatcher сущность
 * в flux архитектуре.
 * Имеет api для регистрации хранилищ
 * (stores) и отправки действия с
 * данными всем хранилищам
 * @class
 */
class Dispatcher {
    /**
     * @constructor
     * @param {Node} logEl - target DOM элемент для логов
     * @param {Bool} isConsoleLog
     */
    constructor(logEl, isConsoleLog) {
        this._callbacks = [];
        this._logsList = []; // Массив с логами
        this._isConsoleLog = isConsoleLog || false;

        this._logEl = logEl || null;
    }

    // public methods
    /**
     * Регестрирует Хранилище в Диспетчере
     * @method
     * @param {function} store
     */
    register(store) {
        if (store && store.reduce) {
            this._callbacks.push(store.reduce.bind(store));
        } else {
            throw Error('You have to pass correct store object!');
        }
    }

    /**
     * Отправляет Объект с действием всем подписанным
     * хранилищам
     * @method
     * @param {Object} action
     */
    dispatch(action) {
        this._callbacks.forEach((cb) => cb(action));
        this._pushLog(action);
    }

    // private methods
    /**
     * Добавлет информацию о текущем действии в
     * логи
     * @method
     * @param {Object} action
     */
    _pushLog(action) {
        const logItem = {
            date: Date.now(),
            type: action.type
        };

        this._logsList.push(logItem);
        this._printLog(logItem);
    }

    /**
     *
     * @param {Object} logItem
     */
    _printLog(logItem) {
        if (this._logEl !== null) {
            this._printLogToDOM(logItem);
        }

        if (this._isConsoleLog) {
            this._printLogToConsole();
        }
    }

    /**
     * Добавляет информацию о передаваемом дествии
     * в контейнер логов в DOM
     * @method
     * @param {Object} logItem
     */
    _printLogToDOM(logItem) {
        const el = document.createElement('p');


        el.innerText = this._genLogString(logItem);
        this._logEl.appendChild(el);
    }

    /**
     * Добавляет информацию о передаваемом дествии
     * в контейнер логов в DOM
     * @method
     * @param {Object} logItem
     */
    _printLogToConsole(logItem) {
        console.log(this._genLogString(logItem));
    }

    /**
     * Возвращает строку с информацией
     * о текущем действии
     * @param {Object} logItem
     * @return {String}
     */
    _genLogString(logItem) {
        const strDate = new Date(logItem.date).toISOString();

        return strDate + ' Type: ' + logItem.type;
    }
}

module.exports = Dispatcher;
